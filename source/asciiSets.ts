export const UpperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const LowerChars = "abcdefghijklmnopqrstuvwxyz";
export const Chars = LowerChars + UpperChars;

export const Numbers = "0123456789";
export const AlphaNumeric = Chars + Numbers;

export const Base64 = AlphaNumeric + "+/";
export const Base64URL = AlphaNumeric + "-_";

export const Braces = "<{[()]}>";
export const Slashes = "\\/";
export const Separators = ",.:;?!";
export const Quotes = "'\"";
export const Miscellaneous = "@#%$|^~_+-*=";
export const SpecialChars = Braces + Slashes + Separators + Quotes + Miscellaneous;