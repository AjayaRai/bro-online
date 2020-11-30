import React, {Component} from 'react';


class AddBtn extends Component {
    // TODO copy the code https://stackoverflow.com/questions/29810914/react-js-onclick-cant-pass-value-to-method to make the passing the parameter work, once I have docId and the userName then I can make the back end for adding a person to the group!!??
    handleClick = () => {
        //this.props.onHeaderClick(this.props.value);
        console.log('value', this.props.userName);
        console.log("pathName", window.location.pathname);
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                Add
            </button>
        );
    }
}

export default AddBtn;