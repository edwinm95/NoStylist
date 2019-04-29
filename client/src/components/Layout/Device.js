const size = {
    desktop: 2560,
    laptopL: 1440,
    laptop: 1024,
    tablet: 768,
    mobileL: 425,
    mobileM: 375,
    mobileS: 320
}
export const device = {
    desktop: `(min-width: ${size.desktop}px)`,
    laptopL: `(min-width: ${size.laptopL}px)`,
    laptop: `(min-width: ${size.laptop}px)`,
    tablet: `(max-width: ${size.tablet}px)`,
    mobileL: `(min-width: ${size.mobileL}px)`,
    mobileM: `(min-width: ${size.mobileM}px)`,
    mobileS: `(min-width: ${size.mobileS}px)`
}
