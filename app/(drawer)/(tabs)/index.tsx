import { View } from 'react-native';

import { commonStyles } from '~/common/common.style';
import Home from '~/components/home/Home';

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    // @ts-ignore
    <View style={commonStyles.container(0)}>
      <Home />
    </View>
  );
}
