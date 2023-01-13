import { Circles } from  'react-loader-spinner'

export default () => {
    return(
        <div className='d-flex justify-content-center py-5'>
            <Circles
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}
  
  