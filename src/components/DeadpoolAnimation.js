import React, { useRef, useEffect, useState } from 'react';
import { Animated, PanResponder, StyleSheet, View, Image, Text } from 'react-native';

const DeadpoolInteractive = () => {
    const panImage = useRef(new Animated.ValueXY()).current;
    const panText = useRef(new Animated.ValueXY()).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    // List of images for the slideshow
    const images = [
        require('../../assets/images/deadpool1.png'),
        require('../../assets/images/deadpool4.png'),
        require('../../assets/images/deadpool2.png'),
        require('../../assets/images/deadpool3.png'),
    ];

    // Slideshow Effect
    useEffect(() => {
        const interval = setInterval(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                // Switch to the next image
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                
                // Fade back in
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            });
        }, 4000); // Switch every 4 seconds

        return () => clearInterval(interval);
    }, [fadeAnim, images.length]);

    // PanResponder for dragging the image
    const panResponderImage = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: panImage.x, dy: panImage.y }
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                Animated.spring(panImage, {
                    toValue: { x: 0, y: 0 },
                    friction: 5,
                    useNativeDriver: false
                }).start();
            }
        })
    ).current;

    // PanResponder for dragging the text
    const panResponderText = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: panText.x, dy: panText.y }
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                Animated.spring(panText, {
                    toValue: { x: 0, y: 0 },
                    friction: 5,
                    useNativeDriver: false
                }).start();
            }
        })
    ).current;

    return (
        <View style={styles.container}>
            {/* Custom text with smooth motion */}
            <Animated.View
                {...panResponderText.panHandlers}
                style={[
                    {
                        transform: [
                            { translateX: panText.x },
                            { translateY: panText.y }
                        ]
                    },
                    styles.textContainer
                ]}
            >
                <Text style={styles.customText}>DEADPOOL</Text>
                <Text style={styles.subText}>Wade Wilson</Text>
                <Text style={styles.subText}>Regeneration, Swords</Text>
                <Text style={styles.subText}>Mercenary</Text>
            </Animated.View>

            {/* Smooth slideshow of images */}
            <Animated.View
                {...panResponderImage.panHandlers}
                style={[
                    {
                        transform: [
                            { translateX: panImage.x },
                            { translateY: panImage.y }
                        ],
                        opacity: fadeAnim
                    },
                    styles.imageWrapper
                ]}
            >
                <Image
                    source={images[currentIndex]}
                    style={styles.image}
                    resizeMode="contain"
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    imageWrapper: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        width: 300,  // Make the image larger
        height: 500, // Adjust to match proportions
    },
    image: {
        width: '100%',
        height: '100%',
    },
    textContainer: {
        position: 'absolute',
        top: 30,
        right: 20,
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
    },
    customText: {
        fontSize: 48, // Bigger for bold impact
        fontWeight: 'bold',
        color: '#E50914', // Bright red, inspired by Deadpool
        fontFamily: 'BadaBoom BB', // Update this to your new font name
        textTransform: 'uppercase', // Make all letters uppercase
        letterSpacing: 4, // Add letter spacing for a more stylized look
        textShadowColor: '#000', // Dark shadow for depth effect
        textShadowOffset: { width: 2, height: 2 }, // Offset for shadow effect
        textShadowRadius: 5, // Smooth the shadow edges
        marginBottom: 15, // Add space between the title and the rest
    },
    subText: {
        fontSize: 20, // Slightly larger and refined
        color: '#ddd', // Light grey for subtle contrast
        fontFamily: 'sans-serif', // Standard, clean sans-serif font
        marginBottom: 5, // Adjust spacing
    },
});

export default DeadpoolInteractive;