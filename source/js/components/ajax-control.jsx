import _             from 'lodash';
import URL           from 'url-parse';
import React         from 'react';
import AppStore      from '../stores/app-store';
import ActionCreator from '../actions/action-creator';
import TextField     from 'material-ui/lib/text-field';

class AjaxControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pushURL: ''
    }
  }

  componentDidMount() {
    let changeCallback = () => {
      console.log('AJAX control: change callback');

      let config = AppStore.getConfig();

      console.debug(config);

      let value = config.push === false ? '' : config.push;

      this.setState({ pushURL: value });
    }

    changeCallback();
    AppStore.addChangeListener(changeCallback.bind(this));
  }

  handleChange(evt) {
    let value = evt.target.value;
    let url   = new URL(value);

    if (_.isEmpty(value)) {
      this.setState({ pushURL: '' });
      ActionCreator.setAjaxPushUrl(false);
    } else if (url.host && url.pathname) {
      this.setState({ pushURL: value });
      ActionCreator.setAjaxPushUrl(value);
    }
  }

  render() {
    this.textField = <TextField
      floatingLabelText="AJAX Push URL"
      hintText="ex. http://url.com/logger/push.json"
      onChange={this.handleChange.bind(this)}
      onEnterKeyDown={this.handleChange.bind(this)}
      defaultValue={this.state.pushURL} />;

    return (
      <div className="ajax-control">
        <h2>AJAX Push</h2>
        {this.textField}
      </div>
    );
  }
}

export default AjaxControl;
