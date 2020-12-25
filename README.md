# blazend-js

## Install

```bash
npm i blazend-js
```

## Usage

```js
import { API } from "blazend-js";

// Initialize API
const api = new API("http://localhost:5000");

// Call service functions
const { status, data } = await api.call("serviceName", "funcName", paramsObj)
console.log("Response", status, data)
```