import axios from "axios";
import { URLSearchParams } from "url";

import { GenerateToken, User } from "../Interfaces";
import UserRepository from "../Repositories/UserRepository";

export async function generateTokenToUser(
  generateToken: GenerateToken
): Promise<string> {
  const repository = new UserRepository();
  const user = await repository.findOneById(generateToken.selectedUser);

  try {
    switch (generateToken.tokenType) {
      case "pix":
        return await generatePixToken(user);
      case "gateway":
        return await generateGatewayToken(user);
      default:
        return "Tipo de token não desenvolvido.";
    }
  } catch (error) {
    console.log(error);
    return error.message ? error.message : "Ocorreu um erro ao gerar o token.";
  }
}

export async function generatePixToken(user: User) {
  const response = await axios.post(
    process.env.URL_PIX_AUTH,
    "username=appAndroid&password=0mN1aPp4nD3d&grant_type=password",
    {
      headers: {
        "Content-Type": "text/plain",
        appversion: "2.17.0",
        deviceOS: "android",
        "sistema-operacional": "android",
        Identificador: user.cpf,
      },
    }
  );

  const access_token = response.data.access_token;

  await axios.post(
    process.env.URL_PIX_LOGIN,
    { cpf: user.cpf, senha: user.accessPassword },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  await axios.post(
    process.env.URL_PIX_ACCOUNT,
    { CPF: user.cpf, Agencia: "0001", Conta: user.accountNumber },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  return access_token ? access_token : "Erro ao gerar token";
}

export async function generateGatewayToken(user: User) {
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", user.cpf);
  params.append("password", user.accessPassword);

  const responseLogin = await axios.post(process.env.URL_GATEWAY, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const refresh_token = responseLogin.data.refresh_token;

  const paramsAccount = new URLSearchParams();
  paramsAccount.append("grant_type", "account_select");
  paramsAccount.append("refresh_token", refresh_token);
  paramsAccount.append("numero_agencia", "1");
  paramsAccount.append("numero_conta", user.accountNumber);

  const responseAccount = await axios.post(
    process.env.URL_GATEWAY,
    paramsAccount,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return responseAccount.data.access_token
    ? responseAccount.data.access_token
    : "Erro ao gerar token";
}
