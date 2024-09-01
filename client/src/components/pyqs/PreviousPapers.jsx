import React from 'react';
import Collapsible from '@edonec/collapsible'; // Importing Collapsible component
import '@edonec/collapsible/build/index.css'; // Importing Collapsible styles
import '@edonec/collapsible/build/icons.css'; // Importing Collapsible icons
import "./styles.css"

const PreviousPapers = () => {
    return (
    <div id="pyqs">
        <Collapsible header="Object Oriented Programming">
            <Collapsible header="Minor-1">
                <table>
                    <tr>
                        <th>Batch</th>
                        <th>Professor</th>
                        <th>Link</th>
                    </tr>
                    <tr>
                        <td>2023-24</td>
                        <td>Sujit Das</td>
                        <a href="https://drive.google.com/drive/folders/1jepPYUjCehGrWX1y3cNY2oP68IrR8bvD" target="_blank">
                            <td>Download</td>
                        </a>
                    </tr>
                </table>            
            </Collapsible>
            <Collapsible header="Minor-2">hi</Collapsible>
            <Collapsible header="Minor-3">hi</Collapsible>
            <Collapsible header="Midsem">hi</Collapsible>
            <Collapsible header="Endsem">hi</Collapsible>
        </Collapsible>
        <Collapsible header="Microprocessors">
        </Collapsible>
        <Collapsible header="Network Analysis">
        </Collapsible>
    </div>
    );
};

export default PreviousPapers;
