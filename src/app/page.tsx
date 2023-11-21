"use client";

import { Button, Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

type formValues = {
  username: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async ({ username, password }: formValues) => {
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      message.success(response.data.message);
      router.push("/dashboard");
    } catch (e) {
      const error = e as AxiosError;

      message.error(error.message);
    }
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: "Username required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "password required" }]}
        >
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
          />
        </Form.Item>
        <Button htmlType="submit">Login</Button>
      </Form>
      <Button>Sign up</Button>
    </>
  );
};

export default Login;
