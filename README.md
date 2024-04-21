# PaletteaWeb

## 概要

このアプリは、アップロードされた画像内の特定の位置をクリックすることで、その位置のピクセル色（RGB値）に最も近い模型用塗料を検索する機能を持つ。

## 設計思想

このアプリケーションの開発では、コンポーネントの責務を明確に分け、静的型付けを通じてコードの品質を保証することに重点を置いた設計思想を採用している。  
Container/Presentationalパターンを利用することで、アプリケーションはロジックを担当する「Container」コンポーネントと、UI表示に専念する「Presentational」コンポーネントに分割される。この分離により、各コンポーネントがその責任に集中し、コードの再利用性とテスト性が向上する。これによって、アプリケーションの構造が整理され、将来の拡張やメンテナンスがしやすくなる。

加えて、型による静的解析を設計の中心に据え、強力な型付けシステムを用いることで、開発段階での型不一致や潜在的エラーを早期に検出し、修正が可能となる。このアプローチにより、ランタイムエラーのリスクが大幅に減少し、より安定したアプリケーションを提供できる。型付けによる静的解析は、コードの可読性と保守性を向上させ、開発者が自信を持ってコードを書くことを支援する。

これらの設計は、アプリケーションの品質、拡張性、保守性を向上させる目的であり、個人での開発でもこれらの原則に従うことで、一貫性のある拡張と改善が可能となる。

## このリポジトリの責務

このリポジトリでは、データとロジックを扱うContainer Componentを開発している。  
一方、UI部分はPresentational Componentとして、別のリポジトリにライブラリ形式で分けている。
https://github.com/kyohei-norita/palettea-ui

## 補足情報

この塗料検索アプリは、自身の技術力を示すポートフォリオの一環として開発した。  
アプリケーションは以下のURLからアクセス  
https://kyohei-norita.github.io/palettea-web/top/color-picker
