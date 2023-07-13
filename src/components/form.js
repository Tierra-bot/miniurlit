import React from "react";
import{ nanoid } from 'nanoid'
import { getDatabase, child, ref, set, get } from "firebase/database";
import { isWebUri } from 'valid-url';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


class Form extends React.Component {

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








}