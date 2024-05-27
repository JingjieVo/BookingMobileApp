// your-project-root/src/typings/declarations.d.ts

declare module 'react-native-image-slider-box' {
    import { Component } from 'react';
    import { ImageURISource, StyleProp, ViewStyle } from 'react-native';
  
    interface SliderBoxProps {
      images: string[] | ImageURISource[];
      sliderBoxHeight?: number;
      onCurrentImagePressed?: (index: number) => void;
      dotColor?: string;
      inactiveDotColor?: string;
      paginationBoxVerticalPadding?: number;
      autoplay?: boolean;
      circleLoop?: boolean;
      parentWidth?: number;
      borderRadius?: number;
      imageLoadingColor?: string;
      ImageComponentStyle?: StyleProp<ViewStyle>;
      paginationBoxStyle?: StyleProp<ViewStyle>;
      dotStyle?: StyleProp<ViewStyle>;
      resizeMethod?: 'auto' | 'resize' | 'scale';
      resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
      ImageComponent?: React.ComponentType;
    }
  
    export class SliderBox extends Component<SliderBoxProps> {}
  }
  