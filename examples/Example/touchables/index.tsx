import React, {Component} from 'react';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';

import {
  TouchableHighlight as RNTouchableHighlight,
  TouchableOpacity as RNTouchableOpacity,
  TouchableNativeFeedback as RNTouchableNativeFeedback,
  TouchableWithoutFeedback as RNTouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  FlatList,
  BackgroundPropType,
} from 'react-native';
import {
  RectButton,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native-gesture-handler';

const BOX_SIZE = 80;

const renderSampleBox = (color: string) => (
  <View
    style={{
      width: BOX_SIZE,
      height: BOX_SIZE,
      backgroundColor: color,
    }}
  />
);

const toReactNativeTouchable = (touchable: typeof React.Component) => {
  if (touchable === TouchableOpacity) return RNTouchableOpacity;
  if (touchable === TouchableWithoutFeedback) return RNTouchableWithoutFeedback;
  if (touchable === TouchableHighlight) return RNTouchableHighlight;
  if (touchable === TouchableNativeFeedback) return RNTouchableNativeFeedback;
  return RNTouchableOpacity;
};

type TouchablesType = {
  type: React.ComponentType<any>;
  props?: Record<string, any>;
  color?: string;
  renderChild: (() => null) | ((color: string) => JSX.Element);
  text: string;
  background?: (A: typeof RNTouchableNativeFeedback) => BackgroundPropType;
};

const TOUCHABLES: TouchablesType[] = [
  {
    type: TouchableWithoutFeedback,
    props: {},
    color: 'mediumseagreen',
    renderChild: renderSampleBox,
    text: 'TouchableWithoutFeedback doing nothing',
  },
  {
    type: TouchableWithoutFeedback,
    props: {
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
    },
    color: 'papayawhip',
    renderChild: renderSampleBox,
    text: 'TouchableWithoutFeedback with callbacks',
  },
  {
    type: TouchableWithoutFeedback,
    props: {
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
      onLongPress: () => console.warn('long press'),
    },
    color: 'powderblue',
    renderChild: renderSampleBox,
    text: 'TouchableWithoutFeedback with callbacks (with longPress)',
  },
  {
    type: TouchableOpacity,
    props: {
      hitSlop: {
        right: 20,
      },
    },
    color: 'palegoldenrod',
    renderChild: renderSampleBox,
    text: 'TouchableOpacity with hitSlop on right',
  },
  {
    type: TouchableOpacity,
    props: {},
    color: 'green',
    renderChild: renderSampleBox,
    text: 'TouchableOpacity doing nothing',
  },
  {
    type: TouchableOpacity,
    props: {
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
      onLongPress: () => console.warn('long press'),
    },
    color: 'violet',
    renderChild: renderSampleBox,
    text: 'TouchableOpacity with callbacks (with longPress)',
  },
  {
    type: TouchableHighlight,
    props: {},
    color: 'darksalmon',
    renderChild: renderSampleBox,
    text: "TouchableHighlight doing nothing (shouldn't be responsive)",
  },
  {
    type: TouchableHighlight,
    props: {
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
      onLongPress: () => console.warn('long press'),
    },
    color: 'goldenrod',
    renderChild: renderSampleBox,
    text: 'TouchableHighlight with callbacks (with longPress)',
  },
  {
    type: TouchableHighlight,
    props: {
      underlayColor: 'white',
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
    },
    color: 'forestgreen',
    renderChild: renderSampleBox,
    text: 'TouchableHighlight with callbacks (without longPress)',
  },
  {
    type: TouchableOpacity,
    props: {
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
      delayPressIn: 1000,
    },
    color: 'darkturquoise',
    renderChild: renderSampleBox,
    text: 'TouchableOpacity with callbacks and delayed pressIn (1000 ms)',
  },
  {
    type: TouchableOpacity,
    props: {
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
      delayPressOut: 1000,
    },
    color: 'darkolivegreen',
    renderChild: renderSampleBox,
    text: 'TouchableOpacity with callbacks and delayed pressOut (1000 ms)',
  },
  {
    type: TouchableOpacity,
    props: {
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
      delayPressOut: 1000,
      delayPressIn: 1000,
    },
    color: 'lightpink',
    renderChild: renderSampleBox,
    text:
      'TouchableOpacity with callbacks and delayed pressOut and pressIn (1000 ms)',
  },
  {
    type: TouchableOpacity,
    props: {
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
      delayLongPress: 1000,
    },
    color: 'lightsteelblue',
    renderChild: renderSampleBox,
    text: 'TouchableOpacity with callbacks and delayed longPress (1000 ms)',
  },
  {
    type: TouchableOpacity,
    props: {
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
      delayPressOut: 1000,
    },
    color: 'lemonchiffon',
    renderChild: renderSampleBox,
    text: 'TouchableHighlight with callbacks and delayed pressOut (1000 ms)',
  },
  {
    type: TouchableOpacity,
    props: {
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
    },
    renderChild: () => null,
    text: 'TouchableOpacity with nothing inside',
  },
  {
    type: TouchableOpacity,
    props: {
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
      style: {
        width: BOX_SIZE,
        height: BOX_SIZE,
        backgroundColor: 'ivory',
      },
    },
    renderChild: () => null,
    text: 'TouchableOpacity with nothing inside and style applied',
  },
  {
    type: TouchableNativeFeedback,
    props: {
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
    },
    color: 'indigo',
    renderChild: renderSampleBox,
    text: 'Simple TouchableNativeFeedback ',
  },
  {
    type: TouchableNativeFeedback,
    props: {
      onPressIn: () => console.warn('press in'),
      onPressOut: () => console.warn('press out'),
      onPress: () => console.warn('press'),
    },
    color: 'firebrick',
    renderChild: renderSampleBox,
    text: 'Simple TouchableNativeFeedback with callbacks',
  },

  {
    type: TouchableNativeFeedback,
    background: (A) => A.SelectableBackground(),
    color: 'transparent',
    renderChild: renderSampleBox,
    text: 'TouchableNativeFeedback (SelectableBackground) tranparent',
  },
  {
    type: TouchableNativeFeedback,
    background: (A) => A.SelectableBackgroundBorderless(),
    color: 'honeydew',
    renderChild: renderSampleBox,
    text: 'TouchableNativeFeedback (SelectableBackgroundBorderless)',
  },
  {
    type: TouchableNativeFeedback,
    background: (A) => A.Ripple('floralwhite', true),
    color: 'greenyellow',
    renderChild: renderSampleBox,
    text: 'TouchableNativeFeedback (Ripple, borderless: true)',
  },
  {
    type: TouchableNativeFeedback,
    // the arguments passed to A.Ripple look like they are taken from PressableAndroidRippleConfig, where the radius is present
    // but the TouchableNativeFeedback exported from RNGH is the same as from RN and none it does not have this interface included
    // in the static Ripple method. But it somehow works.
    // I looks like a mistake. I submitted a PR with the change: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/50063
    // @ts-ignore it is no-op because of the types
    background: (A) => A.Ripple('blue', true, 30),
    color: 'green',
    renderChild: renderSampleBox,
    text: 'TouchableNativeFeedback (Ripple, borderless: true, radius: 30)',
  },
  {
    type: TouchableNativeFeedback,
    background: (A) => A.Ripple('darkslategrey', false),
    color: 'dodgerblue',
    renderChild: renderSampleBox,
    text: 'TouchableNativeFeedback (Ripple, borderless: false)',
  },
];

const screens: Record<string, any> = TOUCHABLES.reduce(
  (map: Record<string, TouchablesType>, obj) => ((map[obj.text] = obj), map),
  {}
);

const ItemSeparator = () => <View style={styles.separator} />;

type ItemType = {
  onPressItem: () => void;
  item: {text: string};
};

function Item(props: ItemType) {
  const {text} = props.item;
  return (
    <RectButton style={styles.button} onPress={() => props.onPressItem()}>
      <Text style={styles.buttonText}>{screens[text].text || text}</Text>
    </RectButton>
  );
}

type TouchableExamplePropsType = StackScreenProps<any, string>;

type TouchableExampleStateType = {
  useScrollView: boolean;
};

export class TouchableExample extends Component<
  TouchableExamplePropsType,
  TouchableExampleStateType
> {
  state = {
    useScrollView: true,
  };

  toggleScrollView = () =>
    this.setState((prev) => ({useScrollView: !prev.useScrollView}));

  render() {
    const {
      type: GHTouchable,
      background,
      props,
      renderChild,
      text,
      color,
    } = screens[this.props.route.params!.item as string];
    const RNTouchable = toReactNativeTouchable(GHTouchable);
    const Component = this.state.useScrollView ? ScrollView : View;

    return (
      // @ts-ignore
      <Component style={{width: '100%', height: '100%', padding: 10}}>
        <TouchableOpacity onPress={this.toggleScrollView}>
          <Text>
            Use {this.state.useScrollView ? 'View' : 'ScrollView'} as a wrapper
          </Text>
        </TouchableOpacity>
        <Text>{text}</Text>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            margin: 20,
          }}>
          <RNTouchable
            {...props}
            background={background?.(RNTouchableNativeFeedback)}>
            {renderChild(color)}
          </RNTouchable>
          <GHTouchable
            {...props}
            background={background?.(TouchableNativeFeedback)}>
            {renderChild(color)}
          </GHTouchable>
        </View>
      </Component>
    );
  }
}

type TouchablesIndexPropsType = {
  navigation: NavigationProp<ParamListBase>;
};

export function TouchablesIndex({navigation}: TouchablesIndexPropsType) {
  return (
    <FlatList
      style={styles.list}
      data={TOUCHABLES}
      keyExtractor={(item) => item.text}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(props) => (
        <Item
          {...props}
          onPressItem={() =>
            navigation.navigate('TouchableExample', {
              item: props.item.text,
            })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonText: {},
});
