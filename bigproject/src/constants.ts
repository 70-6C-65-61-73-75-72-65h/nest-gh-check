export enum NetworkErrors {
  ACCOUNT_EXISTS = 'Account with such email already exists',
  ACCOUNT_DOES_NOT_EXISTS = 'Account with such email does not exist',
  ROLE_EXISTS = 'Role with such value already exists',
  POST_EXISTS = 'Post with such title already exists',
  INVALID_EMAIL_OR_PASSWORD = 'Invalid email or password',
  INVALID_PASSWORD = 'Invalid password',
  UNAUTHORIZED_USER = 'User unauthorized',
  FORBIDDEN = 'Forbidden resource',
  USER_NOT_FOUND = 'User or role was not found',
}

export enum PostgresErrorCode {
  UniqueViolation = '23505',
}
