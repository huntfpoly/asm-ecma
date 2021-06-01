//  Lấy đường dẫn
export const parseRequestUrl = () => {
    const url = window.location.hash.toLowerCase();
    const request = url.split("/");
    return {
        resource: request[1],
        id: request[2],
    };
};
export const rerender = async (component) => {
    document.getElementById('root').innerHTML = await component.render();
    await component.afterRender();
};
export const showLoading = () => {
    document.getElementById('loading-overlay').classList.add('active');
};
export const hideLoading = () => {
    document.getElementById('loading-overlay').classList.remove('active');
};