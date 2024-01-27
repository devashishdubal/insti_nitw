import styled , {createGlobalStyle} from "styled-components";

export const Globalstyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

    html {
        --font-stack: "Poppins", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        width: 100%;
        background-color: ${props => props.theme.colors.primary};;
        height: 100%;
    }

    a {
        color: black;
        text-decoration: none;
    }

    body {
        position: fixed;
        right: -1px;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    *::selection {
        background: #44829F;
        color: white;
    }

    #root {
        width: 100%;
        height: 100%;
    }
`;

export const AppContainer = styled.div`
        width: 100%;
        height: 100%;
        display: flex;
`;

export const Side = styled.div`
        width: 250px;
        background-color: ${props => props.theme.colors.sidebar};
`;

export const Main = styled.div`
        max-width: calc(100% - 250px);
        flex: 1;
        align-items: stretch;
        display: flex;
        flex-direction: column;
`;

export const Center = styled.div`
        padding: 14px;
        overflow-y: scroll;
        flex: 1;
`;

// .scrollbar {
//     overflow-y: scroll;
// }

export const Forceoverflow = styled.div`
        min-height: 1px;
`;

// .scrollbar-primary::-webkit-scrollbar {
//     width: 12px;
//     background-color: #dadada;
// }

// .scrollbar-primary::-webkit-scrollbar-thumb {
//     border-radius: 20px;
//     -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
//     background-color: #bdbdbd;
// }

// .scrollbar-primary::-webkit-scrollbar-thumb:hover {
//     background-color: #a5a5a5;
// }

// .scrollbar-primary::-webkit-scrollbar-thumb:active {
//     background-color: #878787;
// }