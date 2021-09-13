export const METHOD_GET = "GET";
export const METHOD_POST = "POST";
export const METHOD_DELETE = "DELETE";
export const METHOD_PATCH = "PATCH";

export enum ACK_CODE {
  REJECTED,
  APPROVED,
}

export async function fetchJson(
  input: RequestInfo,
  init?: RequestInit | undefined
) {
  return await (await fetch(input, init)).json();
}
