import '../css/MetadadataTable.css'
const MetadataTable = (props) => {

    return(
        <table>
            <tr>
                {
                Object.keys(props.metadata[0]).map(
                    value => value !== 'raw' &&
                        <th>{value}</th>
                    
                )}
            </tr>
            {
                props.metadata.map(
                    value =>
                        <tr>
                            {
                            Object.keys(value).map(
                                key => key !=='raw' &&
                                <td>{value[key]}</td>
                            )}
                        </tr>
                )
            }
        </table>
    )
}

export default MetadataTable