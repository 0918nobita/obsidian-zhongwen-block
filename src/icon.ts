export function volumeHigh(): SVGSVGElement {
    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svgEl.setAttribute(
        'viewBox',
        `0 0 ${__VOLUME_HIGH_ICON_WIDTH__} ${__VOLUME_HIGH_ICON_HEIGHT__}`,
    );

    const pathEl = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path',
    );

    pathEl.setAttribute('d', __VOLUME_HIGH_ICON__);

    svgEl.append(pathEl);

    return svgEl;
}
