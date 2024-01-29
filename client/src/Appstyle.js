import styled , {createGlobalStyle} from "styled-components";

export const Globalstyle = createGlobalStyle`
    
    html {
        --font-stack: "Poppins", system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        width: 100%;
        background-color: ${props => props.theme.colors.primary};
        height: 100%;
        // transition: background-color 0.5s ease-in-out;
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
        transition: background-color 1s ease;
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