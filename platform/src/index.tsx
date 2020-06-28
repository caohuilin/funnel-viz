import React from 'react'
import ReactDOM from 'react-dom'
import VisualizationStore from 'funnel-viz'
import * as inputRuleFuncs from 'funnel-viz'
/* eslint import/no-webpack-loader-syntax: off */
import VisualizationStype from '!!raw-loader!funnel-viz/dist/index.css'
/* eslint import/no-webpack-loader-syntax: off */
import visualizationConfigForm from '!!raw-loader!funnel-viz/dist/form.xml'
import { account } from '../package.json'

const App = () => {
  return global['__Pandora__VisualizationAppRender'](
    VisualizationStore,
    visualizationConfigForm,
    VisualizationStype,
    inputRuleFuncs,
    account
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
