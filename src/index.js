import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    StyleSheet,
    View,
    Modal,
    Animated,
    ActivityIndicator
} from 'react-native'

export const SIZE_SMALL = 'small'
export const SIZE_LARGE = 'large'

const FADE_SHOW_VALUE = 1
const FADE_HIDE_VALUE = 0
const FADE_DURATION = 1000

function Indicator(props) {
    const [fadeIn] = useState(new Animated.Value(FADE_HIDE_VALUE))

    useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: FADE_SHOW_VALUE,
            duration: FADE_DURATION,
            useNativeDriver: true
        }).start()
    }, [])

    const containerStyle = {
        opacity: fadeIn
    }

    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={props.loading}
        >
            <Animated.View style={[styles.container, containerStyle]}>
                <View style={styles.loadingWrapper}>
                    <ActivityIndicator
                        size={props.size}
                        color={props.color}
                        animating={props.loading}
                    />
                </View>
            </Animated.View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 69,
        height: 69,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 5
    }
})

Indicator.propTypes = {
    size: PropTypes.oneOf([SIZE_SMALL, SIZE_LARGE]),
    color: PropTypes.string,
    loading: PropTypes.bool,
}

Indicator.defaultProps = {
    size: SIZE_LARGE,
    color: '#fff',
    loading: false,
}

export default Indicator
