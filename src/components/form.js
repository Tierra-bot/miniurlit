import React from 'react';
import{ nanoid } from 'nanoid'
import { getDatabase, child, ref, set, get } from "firebase/database";
import { isWebUri } from 'valid-url';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


class Form extends React.Component {
//for the text box information parameters 

constructor(props) {
    super(props);
    this.state = {
        longUrl: '',
        preferedAlias:'',
        loading: false,
        errors: [],
        errorMessage: {},
        toolTipMessage: 'Copy to Clip Board'

    };


}


//called when user hits submit
onSubmit= async(Event) =>{
    event.preventDefault(); //prevents pages from reloading
    this.setState({
        loading: true,
        generatedURL: ''
            })

        //validate input
        var isFormValid = await this.validateInput()
        if (!isFormValid) {
            return
        }


        //use characters to generate url by calliing nanoid
        //be sure to change my domain to miniurlit
        var generatedKey = nanoid(5);
        var generatedURL = "miniURLit.com/" +generatedKey


        if (this.state.preferedAlias !='') {
            generatedKey = this.state.preferedAlias
            generatedURL = "miniURLit.com/" + this.state.preferedAlias
        }
        
        //writing information to the database
        const db = getDatabase();
        set(ref(db, '/' + generatedKey), {

            generatedKey: generatedKey,
            longUrl: this.state.longUrl,
            preferedAlias: this.state.preferedAlias,
            generatedURL: generatedURL

        }).then ((result) => {
            this.setState({
                generatedURL: generatedURL,
                loading: false
            })


        //handles error
        }).catch((e) => {

        })
        
};

    //checks for an error
    hasError = (key) => {
        return this.setState.errors.indexOf(key) !== -1;
    }
    
    //save the content of the form
    handleChange= (e) => {
        const { id, value } = e.target
        this.setState(prevState => ({
            ...prevState,
            [id]: value
    }))    

}


}


validateInput = async () => {
    var errors = [];
    var errorMessage = this.state.errorMessage


    //validate long url
    if (this.state.longURL.length === 0) {
        errors.push("longURL");
        errorMessages['longURL'] = 'Please enter your URL!';
    } else if (!isWebUri(this.state.longURL)) {
        errors.push("longURL");
        errorMessages['longURL'] = 'Please a URL in the form of https://www....';
    }

    //preferred alias checking for correct params
    if (this.state.preferedAlias !=='') {
        if (this.state.preferredAlias.length > 7) {
            errors.push("suggestedAlias");
            errorMessages['suggestedAlias'] = 'Spaces are not allowed in URLS;'
        }

        //checks databvse to see if it already exists
        var keyExists = await this.checkKeyExists()
        if (keyExists.Exists()) {
            errors.push("suggestedAlias");
            errpors.errorMessages['suggestedAlias'] = 'The Alias you have entered already exists! Please enter amother one =-)';
        }
        
        
    }

    //updates state of the page
    this.setState({
        errors: errors,
        errorMessages: errorMessages,
        loaing: false
    });

    if (errors.length > 0) {
        return false;
    }

    return true;

    //checks if the key exists in db and fetches 
    checkKeyExists = async () => {
        const dbRref = ref(getDatabase());
        return get(child(dbRef, '/${this.state.preferedAlias}')).catch((error) => {
            return false
        });
    }

    //copying to clipboard after clicked
    copytoClipBoard = () => {
        naviagtor.clipboard.writeText(this.state.generatedURL)
        this.setState({
            toolTipMessage: 'Copied!'

        })
    }

    render() 
        return (
            <div className="container">
                <form autoComplete="off">
                    <h3>Mini URL It!</h3>

                    <div className="form-group">
                        <label>Enter Your Long URL</label>
                        <input
                            id="longURL"
                            onChange={this.handleChange}
                            value={this.state.longURL}
                            type="url"
                            required
                            className={
                                this.hasError("longURL")
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            placeholder="https://www..."
                        />
                    </div>
                    <div
                        className={
                            this.hasError("longURL") ? "text-danger" : "visually-hidden"
                        }
                    >
                        {this.state.errorMessage.longURL}
                    </div>

                    <div className="form-group">
                        <label htmlFor="basic-url">Your Mini URL</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">miniURLit.com/</span>
                            </div>
                            <input
                                id="preferedAlias"
                                onChange={this.handleChange}
                                value={this.state.preferedAlias}
                                className={
                                    this.hasError("preferedAlias")
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                type="text" placeholder="eg. 3fwias (Optional)"
                            />
                        </div>
                        <div
                            className={
                                this.hasError("suggestedAlias") ? "text-danger" : "visually-hidden"
                            }
                        >
                            {this.state.errorMessage.suggestedAlias}
                        </div>
                    </div>


                    <button className="btn btn-primary" type="button" onClick={this.onSubmit}>
                        {
                            this.state.loading ?
                                <div>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                </div> :
                                <div>
                                    <span className="visually-hidden spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span>Mini URL It</span>
                                </div>
                        }

                    </button>

                    {
                        this.state.generatedURL === '' ?
                            <div></div>
                            :
                            <div className="generatedurl">
                                <span>Your generated URL is: </span>
                                <div className="input-group mb-3">
                                    <input disabled type="text" value={this.state.generatedURL} className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <OverlayTrigger
                                            key={'top'}
                                            placement={'top'}
                                            overlay={
                                                <Tooltip id={`tooltip-${'top'}`}>
                                                    {this.state.toolTipMessage}
                                                </Tooltip>
                                            }
                                        >
                                            <button onClick={() => this.copyToClipBoard()} data-toggle="tooltip" data-placement="top" title="Tooltip on top" className="btn btn-outline-secondary" type="button">Copy</button>

                                        </OverlayTrigger>

                                    </div>
                                </div>
                            </div>
                    }

                </form>
            </div>
        );
    }


export default Form;






