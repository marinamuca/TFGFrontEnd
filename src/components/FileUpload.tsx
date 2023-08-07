import { ChangeEventHandler } from 'react'
import { FaPaperclip } from 'react-icons/fa'
// import 'bootstrap/dist/css/bootstrap.css';

interface FileUploadProps {
    file: File | null,
    onChange: ChangeEventHandler,
    accept: string
}

const FileUpload = (props: FileUploadProps) => {
    return (
        <>
            <div className="input-group mb-3">
                <label htmlFor="file-upload" className="btn btn-outline-secondary"><FaPaperclip/></label>
                <span className={'form-control ' + (props.file? "" : "text-muted") }>{props.file? props.file.name : "Selecciona un archivo"}</span>
            </div>
            <input id='file-upload' hidden type='file' accept={props.accept} onChange={props.onChange} ></input>
        </>
    )
}
export default FileUpload;