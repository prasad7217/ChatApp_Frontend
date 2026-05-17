# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# Deployement Commands 
    - Sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx (For starting the ngnix)
    - sudo systemctl enable nginx (We must enable nginx)
    - We should need to copy the dist folder(build files) of my project into nginx (var/www/html/)
    - sudo scp -r dist/* var/www/html/ (From the project path)
    -We have to enable port no. 80 in AWS platform -> security rules -> inbound rules -> add port 80 to run our application in production 

