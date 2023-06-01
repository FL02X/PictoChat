import { useRouteError } from 'react-router-dom'

const Error = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <div className='text-center'>
            <h1>💩💩</h1>
            <p>Mames, ha ocurrido un error al cargar la pagina</p>
            <p style={{color: 'red'}}>❌ {error.statusText || error.message}</p>
        </div>
    );
}

export default Error;