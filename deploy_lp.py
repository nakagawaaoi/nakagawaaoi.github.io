# -*- coding: utf-8 -*-
import os
import requests
import base64
import re
from dotenv import load_dotenv

load_dotenv()

WP_URL = os.getenv("WP_URL").rstrip("/")
WP_USER = os.getenv("WP_USER")
WP_PASSWORD = os.getenv("WP_PASSWORD")
WP_APP_PASSWORD = os.getenv("WP_APP_PASSWORD", "").replace(" ", "")

# Basic Auth header
credentials = f"{WP_USER}:{WP_APP_PASSWORD}"
token = base64.b64encode(credentials.encode()).decode('utf-8')
headers = {
    'Authorization': f'Basic {token}',
    'Content-Type': 'application/json'
}

# # index.html の中身を動的に読み込む
index_html_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "index.html")
if not os.path.exists(index_html_path):
    print(f"[x] index.html not found at {index_html_path}!")
    exit(1)

print(f"[*] Reading index.html from {index_html_path}...")
with open(index_html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# WordPressテンプレートとしてのヘッダーを付与する
PAGE_1_TEMPLATE = """<?php
/*
Template Name: Aoi Nakagawa Profile
*/
?>
""" + html_content
def create_wp_page():
    print("[1] スラッグ「1-2」の固定ページを確認中...")
    pages_url = f"{WP_URL}/wp-json/wp/v2/pages?slug=1-2&status=any"
    try:
        res = requests.get(pages_url, headers=headers, timeout=10)
        if res.status_code == 200:
            pages = res.json()
            if len(pages) > 0:
                page_id = pages[0]["id"]
                print(f"  ✅ 固定ページは既に存在します (ID: {page_id})")
                print("  → キャッシュクリアトリガーのため固定ページを更新します...")
                import time
                dummy_content = f"Aoi Nakagawa Profile Page (Updated: {int(time.time())})"
                update_res = requests.post(f"{WP_URL}/wp-json/wp/v2/pages/{page_id}", json={"status": "publish", "content": dummy_content}, headers=headers, timeout=10)
                print(f"  → 更新結果: {update_res.status_code}")
                return page_id
            else:
                print("  → 固定ページが存在しません。新規作成します...")
                create_data = {
                    "title": "Aoi Nakagawa",
                    "slug": "1-2",
                    "status": "publish",
                    "content": "Aoi Nakagawa Profile Page"
                }
                create_res = requests.post(f"{WP_URL}/wp-json/wp/v2/pages", json=create_data, headers=headers, timeout=10)
                if create_res.status_code == 201:
                    page_id = create_res.json()["id"]
                    print(f"  ✅ 新規作成成功 (ID: {page_id})")
                    return page_id
                else:
                    print(f"  ❌ 固定ページの作成に失敗: {create_res.status_code} {create_res.text}")
                    return None
        else:
            print(f"  ❌ 固定ページの確認に失敗: {res.status_code}")
            return None
    except Exception as e:
        print(f"  ❌ エラー: {e}")
        return None

def deploy_template():
    print("\n[2] theme-editor 経由で page-1.php の直接更新を試みます...")
    
    session = requests.Session()
    login_url = f"{WP_URL}/wp-login.php"
    login_data = {
        'log': WP_USER,
        'pwd': WP_PASSWORD,
        'wp-submit': 'Log In',
        'redirect_to': f'{WP_URL}/wp-admin/',
        'testcookie': '1'
    }
    
    session.get(login_url, timeout=10)
    login_res = session.post(login_url, data=login_data, allow_redirects=True, timeout=15)
    
    if 'wp-admin' not in login_res.url and login_res.status_code != 200:
        print("  ❌ WordPress管理画面へのログインに失敗しました。")
        return False
        
    print("  ✅ WordPress管理画面へのログインに成功しました。")
    
    # page-1.php の編集画面を取得
    editor_url = f"{WP_URL}/wp-admin/theme-editor.php?file=page-1.php&theme=cocoon-child-master"
    editor_res = session.get(editor_url, timeout=10)
    
    if editor_res.status_code != 200:
        print(f"  ❌ page-1.phpの編集画面の取得に失敗しました: {editor_res.status_code}")
        return False
        
    nonce_match = re.search(r'id="nonce"\s+name="nonce"\s+value="([^"]+)"', editor_res.text)
    if not nonce_match:
        print("  ❌ Nonceの取得に失敗しました。")
        return False
        
    nonce = nonce_match.group(1)
    
    print("  [*] page-1.php へ直接書き込み中...")
    update_data = {
        'nonce': nonce,
        '_wp_http_referer': '/wp-admin/theme-editor.php',
        'newcontent': PAGE_1_TEMPLATE,
        'action': 'update',
        'file': 'page-1.php',
        'theme': 'cocoon-child-master',
        'scrollto': '0',
        'submit': 'ファイルを更新'
    }
    
    update_res = session.post(f"{WP_URL}/wp-admin/theme-editor.php", data=update_data, allow_redirects=True, timeout=15)
    
    if update_res.status_code == 200 and ('ファイルの編集に成功' in update_res.text or 'File edited successfully' in update_res.text or 'updated' in update_res.url):
        print("  ✅ page-1.php の直接更新に成功しました！")
        return True
    else:
        print("  ❌ page-1.php の書き込みに失敗しました。")
        return False

def html_unescape(s):
    # HTML entities 戻し
    s = s.replace('&lt;', '<')
    s = s.replace('&gt;', '>')
    s = s.replace('&amp;', '&')
    s = s.replace('&quot;', '"')
    s = s.replace('&#039;', "'")
    return s

if __name__ == "__main__":
    page_id = create_wp_page()
    if page_id:
        success = deploy_template()
        if success:
            print("[*] 固定ページのテンプレートを設定中...")
            update_res = requests.post(
                f"{WP_URL}/wp-json/wp/v2/pages/{page_id}",
                json={"template": "page-1.php"},
                headers=headers,
                timeout=10
            )
            if update_res.status_code == 200:
                print("  ✅ 固定ページへのテンプレート適用に成功しました！")
            else:
                print(f"  ❌ テンプレートの適用に失敗: {update_res.status_code} {update_res.text}")
            print(f"\n🎉 すべてのデプロイ作業が正常に完了しました！")
            print(f"👉 表示確認URL: {WP_URL}/1-2 (または自動リダイレクト: {WP_URL}/1)")
        else:
            print("\n❌ テンプレートの書き出しに失敗しました。")
    else:
        print("\n❌ 固定ページの準備に失敗しました。")
