import React from "react";

const LoginForm = () => {
  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-lg font-bold mb-2">Login</h2>
      <form className="flex flex-col gap-2">
        <input type="email" placeholder="Email" className="border p-2 rounded" />
        <input type="password" placeholder="Password" className="border p-2 rounded" />
        <button className="bg-blue-600 text-white p-2 rounded">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
