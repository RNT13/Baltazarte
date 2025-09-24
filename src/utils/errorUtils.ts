// Primeiro, definimos a interface do erro da API aqui.
// Não precisa ser global se só for usada por esta função.
interface ApiError {
  status: number
  data: {
    message: string
  }
}

// Em seguida, a função type guard, que pode ser local a este arquivo.
function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error &&
    typeof (error as ApiError).data === 'object' &&
    (error as ApiError).data !== null &&
    'message' in (error as ApiError).data
  )
}

/**
 * Extrai uma mensagem de erro legível de um erro de tipo 'unknown'.
 * Lida com erros da API (ApiError), erros padrão do JavaScript (Error)
 * e outros casos inesperados.
 *
 * @param error O erro capturado em um bloco catch.
 * @param defaultMessage Uma mensagem padrão para usar se nenhuma outra puder ser encontrada.
 * @returns Uma string contendo a mensagem de erro.
 */
export function getErrorMessage(error: unknown, defaultMessage = 'Ocorreu um erro inesperado. Tente novamente.'): string {
  if (isApiError(error)) {
    // Se for um erro da nossa API, retorna a mensagem específica.
    return error.data.message
  }

  if (error instanceof Error) {
    // Se for um erro padrão do JavaScript, retorna sua mensagem.
    return error.message
  }

  // Fallback para outros tipos de erros (ex: strings, números lançados como erro)
  return defaultMessage
}
