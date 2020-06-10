# LATTE

LATTE為一主要採用TypeScript開發的單頁網站應用(全端)。

本文主要聚焦在筆者開發LATTE的 Tech Stack ，以及一路上的 Try and Error 。

>筆者個人網站 [Austin Liu](https://austin362667.github.io/)
```
專案作者：劉立行 
文章作者：劉立行 
專案建立日期：2020/5/21
文章建立日期：2020/6/10
```

## 1 - 前言

本專案採用Deno.js作為後端開發環境。
若您還沒使用過 Deno，建議先看完以下這篇再繼續看本文！

[iThome新聞](https://www.ithome.com.tw/news/137613)

>以下短文節錄自[Deno官網](https://deno.land/)
```
Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.
```

本專案初期大量參考筆者教授陳鍾誠博士之作品

>陳鍾誠的個人網站 [CCC](https://misavo.com/blog/Home)
>
>[POS系統](https://github.com/ccc-js/pos)
>
>[Blog系統](https://github.com/ccc-js/blog6)

## 2 - 工程技術

## 3 - 心路歷程

Pitfall 1. 沒寫測試
----
deno的第三方web server套件 oak ，在上傳大型檔案(如圖片等)，會出現 Request Stalled 問題，導致 file system 無法正常讀寫。

Solution：

筆者單獨測了Database，確定不是PostgreSql的問題，
接著測了Fetch..

未完待續..
