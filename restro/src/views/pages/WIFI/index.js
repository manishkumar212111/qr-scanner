import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import { createStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { generateWifiQRCode } from 'wifi-qr-code-generator'
import { makeStyles } from '@material-ui/styles';
import * as htmlToImage from "html-to-image";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
        margin:20
       //width: 948,
      // flexGrow: 1
    },
    mainPanel: {
        padding:20
    },
    inputSide: {
      minWidth: 450,
      padding:20

    },
    outputSide: {
      minWidth: 200,
      padding:20,
      textAlign: 'center',
      height: '100%'
    },
    outputImage: {
      paddingTop: 16,
      paddingBottom: 16
    },
    encryptionRow: {
        padding:20
    },
    formControl: {
      // marginTop: theme.spacing(1)
      // minWidth: 120,
    }
  })
)

function App() {
  const classes = useStyles()

  const [ssid, setSSID] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [encryption, setEncryption] = React.useState('WPA')
  const [hiddenSSID, setHiddenSSID] = React.useState(false)

  const [output, setOutput] = React.useState('')

  const handleSSIDChange = (event) => {
    setSSID(event.target.value)
    setTimeout(() =>{
      updateOutput(
        {ssid:event.target.value, password:password, encryption:encryption,hiddenSSID:hiddenSSID}
      )
    },100)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    setTimeout(() =>{
      updateOutput(
        {ssid:ssid, password:event.target.value, encryption:encryption,hiddenSSID:hiddenSSID}
      )
    },100)
  }

  const handleEncryptionChange = (event) => {
    setEncryption(event.target.value)
    setTimeout(() =>{
      updateOutput(
        {ssid:ssid, password:password, encryption:event.target.value,hiddenSSID:hiddenSSID}
      )
    },100)
  }
  const handleHiddenSSIDChange = (event) => {
    setHiddenSSID(event.target.checked)
    setTimeout(() =>{
      updateOutput(
        {ssid:ssid, password:password, encryption:encryption,hiddenSSID:event.target.checked}
      )
    },100)
  }

  const downloadImage = () => {
    var node = document.getElementById("my-qr");
    htmlToImage.toJpeg(node, { quality: 1 }).then(function (dataUrl) {
      console.log(dataUrl)
      var link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      link.href = dataUrl;
      link.click();
    
    });

    // exportComponentAsPNG(componentRef , { html2CanvasOptions: {borderRadius: 10} });
    // setLoading(false);

  };

  const updateOutput = async (obj) => {
    if (ssid.trim() === '') {
      return
    }
    try {
      let out = await generateWifiQRCode({
        ssid: obj.ssid,
        password: obj.password,
        encryption: obj.encryption,
        hiddenSSID: obj.hiddenSSID,
        outputFormat: { type: 'image/png' }
      })
      setOutput(out)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='column'
        justify='flex-start'
        alignItems='center'
        spacing={3}
      >
        <Grid item >
          <Grid
            container
            direction='column'
            justify='flex-start'
            alignItems='center'
            spacing={0}
          >
            <Grid item xs>
              <Typography variant='h3' gutterBottom>
                Wifi Qr generetor
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Paper className={classes.mainPanel}>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='flex-start'
              wrap='nowrap'
            >
              <Grid item xs={6} className={classes.inputSide} zeroMinWidth>
                <form noValidate autoComplete='off'>
                  <Grid
                    container
                    direction='column'
                    justify='center'
                    alignItems='flex-start'
                  >
                    <Grid item xs={12}>
                      <Grid
                        container
                        justify='flex-start'
                        alignItems='flex-start'
                      >
                        <Grid item xs={9}>
                          <TextField
                            id='ssid'
                            label='WiFi Name (SSID)'
                            value={ssid}
                            onChange={handleSSIDChange}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <Tooltip title='Is this a hidden WiFi network?' arrow>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={hiddenSSID}
                                  onChange={handleHiddenSSIDChange}
                                  name='hidden'
                                  color='primary'
                                />
                              }
                              label='Hidden?'
                            />
                          </Tooltip>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id='password'
                        label='Password'
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </Grid>

                    <Grid item xs={12} className={classes.encryptionRow}>
                      <FormControl component='fieldset'>
                        <FormLabel component='legend'>Encryption</FormLabel>
                        <RadioGroup
                          row
                          aria-label='encryption'
                          name='encryption'
                          value={encryption}
                          onChange={handleEncryptionChange}
                        >
                          <FormControlLabel
                            value='WPA'
                            control={<Radio />}
                            label='WPA / WPA2'
                          />
                          <FormControlLabel
                            value='WEP'
                            control={<Radio />}
                            label='WEP'
                          />
                          <FormControlLabel
                            value='None'
                            control={<Radio />}
                            label='None'
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item xs={6} zeroMinWidth style={{textAlign:"center"}}>
                <div className={classes.outputSide} id="my-qr">
                  {output && ssid ? (
                    <>
                      <img
                        src={output}
                        className={classes.outputImage}
                        alt='qr-code'
                        id='qr-code-image'
                        width='350'
                        height='350'
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {output && ssid && <button
                    type="button"
                    // onClick={() => }
                    onClick={downloadImage}
                    class="btn update-btn"
                  >
                    DOWNLOAD QR
                  </button>}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default App