import {actionTypes, mutationTypes} from '../../store/modules/task'

import { createNamespacedHelpers } from 'vuex'

const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('task')

const stateMapper = mapState({})

const gettersMapper = mapGetters({})

const mutationsMapper = mapMutations({})

const actionsMapper = mapActions({})

export default {
  stateMapper,
  gettersMapper,
  mutationsMapper,
  actionsMapper
}
