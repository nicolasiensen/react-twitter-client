import React, { Component } from 'react'
import * as api from './../lib/api'
import { space1, fontBold, borderRadius, lightGray, inputBorderWidth, space2, h5 } from './../lib/styles'

class LinkPreview extends Component {
  constructor(props) {
    super(props)
    this.state = { meta: null }
  }

  async componentDidMount() {
    const response = await api.loadLinkPreview(this.props.url)

    const ogTitle = response.body.meta.find(m => m.property === 'og:title')
    const ogImage = response.body.meta.find(m => m.property === 'og:image')
    const ogDescription = response.body.meta.find(m => m.property === 'og:description')
    const ogVideo = response.body.meta.find(m => m.property === 'og:video:url')

    this.setState({
      meta: {
        title: ogTitle ? ogTitle.content : null,
        image: ogImage ? ogImage.content : "",
        description: ogDescription ? ogDescription.content : "",
        video: ogVideo ? ogVideo.content : null,
      }
    })
  }

  render() {
    const { meta } = this.state

    return (
      <div style={{marginTop: space1, borderColor: lightGray, borderWidth: inputBorderWidth, borderRadius, borderStyle: 'solid', overflow: 'hidden'}}>
        {
          meta ? (
            <div>
              {
                meta.video ? (
                  <iframe
                    title={meta.title}
                    style={{width: '100%', height: '350px'}}
                    src="https://www.youtube.com/embed/MUKJTbOD-pc"
                    frameborder="0"
                    gesture="media"
                    allowfullscreen>
                  </iframe>
                ) : meta.image && (
                  <img style={{width: '100%'}} alt='123' src={meta.image} />
                )
              }
              <div style={{padding: space2, fontSize: h5}}>
                <div style={{fontWeight: fontBold, marginBottom: space1}}>{meta.title}</div>
                <div>{meta.description}</div>
              </div>
            </div>
          ) : <div style={{textAlign: 'center'}}>Loading...</div>
        }
      </div>
    )
  }
}

export default LinkPreview
