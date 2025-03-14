# Shopping Cart - Assignment

* โปรเจคนี้ใช้ Vite ในการ Install
* โปรเจคนี้พัฒนาด้วย React + Typescript
* โปรเจคนี้ใช้ json-server สำหรับเป็น mockup database สามารถอ่านวิธีการใช้ได้ดังนี้ 
https://www.npmjs.com/package/json-server
หรือสำหรับเทส กรุณาใช้
```bash
json-server --watch db.json
```

สำหรับเว็บไซต์จะแบ่งเป็น 2 หน้า สำหรับการ Checkout และสั่งซื้อสินค้า โดยเราจะทำการเลือกจำนวนสินค้า กดเพิ่มสินค้า และไปชำระเงิน โดยข้อมูลเบื้องต้นจะเก็บเป็น localStorage เพื่อใช้ในการเก็บข้อมูลไว้สำหรับการคิดเงิน และมีข้อดีคือเมื่อ Refresh Page ข้อมูลก็จะไม่หายด้วย

สำหรับ Product และ Coupon รวมถึง perameter ที่จะใช้กำหนดว่าจะลดเท่าไหร่ ชื่อคูปอง และหมวดหมู่ สามารถกำหนดได้ที่ db.json

ขอบคุณครับ :D

Thiraphat Itamonchai
ธีรภัทร อิฐอมรชัย





# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
# shopping-cart-assignment
