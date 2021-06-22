const Button = (
    {
        text = 'save',
        textSize = 'text-lg',
        textColor = 'text-white',
        bg = 'bg-blue-500',
        hoverBg = 'bg-blue-700',
        name = '',
        option = []
    }
) => {
    const options = option.map(item => Object.entries(item).map(item => item.join('')))

    return `
    <button name="${name}" ${options} class="form-submit ${textSize} ${textColor} ${bg} hover:${hoverBg}  py-1 px-2 mx-1 
                                    rounded focus:outline-none">${text}</button> 
    `;
}
export const ButtonLink = (
    {
        linkUrl = '#',
        text = 'save',
        textSize = 'text-lg',
        textColor = 'text-white',
        bg = 'bg-primary',
        hoverBg = 'bg-primary-lighter'
    }
) => {
    return `
        <a href="${linkUrl}">
            <button class="form-submit ${textSize} ${textColor} ${bg} hover:${hoverBg}  py-1 px-2 mx-1 
                rounded focus:outline-none">${text}</button> 
        </a>
    `;
}
export default Button;