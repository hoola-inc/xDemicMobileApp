import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Footer, FooterTab, Icon, Badge, Text } from 'native-base'
import { PropTypes } from 'prop-types'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class BaseFooter extends Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <Footer>
        <FooterTab>
          <Button badge onPress={() => navigate('ExampleScreen')}>
            <Badge>
              <Text>51</Text>
            </Badge>

            <Icon name="navigate" />
          </Button>
          <Button active onPress={() => navigate('ExampleScreen')}>
            {/* <Badge>
              <Text>52</Text>
            </Badge> */}

            <Icon active name="home" />
          </Button>
          {/* <Button onPress={() => navigate('ExampleScreen')}>
            <Badge>
              <Text>53</Text>
            </Badge> 

            <Icon name="person" />
          </Button>*/}
          <Button onPress={() => navigate('ExampleScreen')}>
            {/* <Badge>
              <Text>54</Text>
            </Badge> */}

            <Icon name="settings" />
          </Button>
        </FooterTab>
      </Footer>
    )
  }
}

BaseFooter.propTypes = {
  navigation: PropTypes.object,
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseFooter)
