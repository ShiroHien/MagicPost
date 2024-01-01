export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
export const OBJECT_ID_RULE_MESSAGE = 'Your string fails to match the Object Id pattern!'

export const PASSWORD_RULE = /^[a-zA-Z0-9]{8,30}$/
export const PASSWORD_RULE_MESSAGE = 'Password must contain a to z, A to Z, 0 to 9 and have min length equals 8 and max length equals 30!'

export const PHONE_RULE = /^[0-9]{10}$/
export const PHONE_RULE_MESSAGE= 'Phone number must have 10 digits!'
