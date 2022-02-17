
const MetadataTable = (props) => {

    return(
        <table>
            <tr>
                {
                Object.keys(props.metadata[0]).map(
                    value => 
                        <th>{value}</th>
                    
                )}
            </tr>
            {
                props.metadata.map(
                    value =>
                        <tr>
                            {
                            Object.keys(value).map(
                                key =>
                                <td>{value[key].join("\n")}</td>
                            )}
                        </tr>
                )
            }
        </table>
    )
}

export default MetadataTable