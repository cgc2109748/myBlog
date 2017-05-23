<template lang="html">
  <div class="travels">
    <div class="travels-add">
      <v-button icon="add" @click="showModal = true">新增</v-button>
    </div>
    <timeline>
      <timeline-item :label="item.label" v-for="(item, index) in dataJson">
        <tag :type="item.type" v-if="item.label" @click.native="toggleDatePicker(index)">
          {{item.date}}
          <date-picker ref="datepicker" value="2015-02-02" format="DD/MM/YYYY" :args="datePickerArgs"></date-picker>
        </tag>
        <span v-if="!item.label" class="fa fa-envelope tag--primary"></span>
        <div v-if="!item.label" class="timeline-item">
          <span class="time"><i class="fa fa-clock-o"></i>{{item.date}}</span>
          <h3 class="timeline-header"><a href="#">{{item.place}}</a>{{item.viewSport}}</h3>
          <div class="timeline-body">
            {{item.text}}
          </div>
          <div class="timeline-footer">
            <v-button color="primary" class="button is-primary is-small">编辑</v-button>
            <v-button color="red" class="button is-danger is-small">删除</v-button>
          </div>
        </div>
      </timeline-item>
    </timeline>
    <modal
    v-model="showModal"
    title="新增游记"
    width="800"
    @on-ok="add"
    @on-cancel="close">
      <v-input></v-input>
    </modal>
  </div>
</template>

<script>
import Tag from 'components/tag'
import vButton from 'components/button'
import vInput from 'components/input'
import {Timeline, TimelineItem} from 'components/Timeline'
import {invoke, getApiJson} from  'src/api'
import Modal from 'components/modal'
import DatePicker from 'components/datepicker'
export default {
  components: {
    Tag,
    vButton,
    vInput,
    Timeline,
    TimelineItem,
    Modal,
    DatePicker
  },
  data () {
    return {
      model: '',
      showModal: false,
      datePickerArgs: {
        name: 'start',
        disabled: true,
        format: 'MM-DD-YYYY',
        type: 'DateBox-Date'
      },
      modalTitle: '新增游记',
      dataJson: [],
      format: 'MMM DD YYYY, h:mm:ss a',
      args: {
        type: 'success',
        place: '珠海',
        viewSport: '长隆海洋王国',
        text: `今天妈妈带着我和她的朋友王平阿姨还有王萍阿姨的女儿，依依，一起去珠海横琴长隆海洋王国。经过一小时左右的车程，我们到达了珠海，之后我们做的士到我们住的酒店，稍作休息后，我们坐的士到长隆海洋王国，路上我还看到了海另一边的澳门，来到海洋王国，我们最先看的是海狮，海狮的身体很笨重，可游在水里快极了。之后我们去到了企鹅馆，小企鹅摆动着胖胖的身子可爱极了。我们还去了北极熊馆，北极熊馆可真冷啊！可我还要继续观看，之后我又玩了几个游乐设施，其中冰山过山车最让我记忆深刻，冰山过山车玩一次只有八分钟，但是非常好玩，在跨越冰山顶峰之时瞬间急剧下滑，盘山高速转弯简直刺激极了！随后我们来到了鲸鲨馆，排队的人真多呀！我们排了十几分钟才进馆了，这里面一定很好玩，啊！太美丽了，湛蓝的海水在四处涌动，巨大的鲸鲨在身旁穿梭，鳐鱼扇动着双翅滑浪而过，妖娆的海鳝躲在礁石中好奇张望，懒洋洋的大海龟趴在不远处的珊瑚上睡觉……之后我还看到了五彩缤纷的水母和各式各样的海洋生物。随后，我来到了欢乐海豚游戏区，坐上海豚船，海豚船一会儿上，一会儿下，大家互相喷射水柱嬉戏，好玩极了！

　　鲸鲨馆里的有最大的鲸鲨，一只叫“点睛”，另一只叫“丽莎”，这可是森碟小朋友起的名字。哦！忘了，我还和工作人员扮演的鲸鲨王握过手呢！

    三年级:刘畅`,
        date: moment().format(this.format)
      }
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      getApiJson('api/Travels.query', {})
        .then((res) => {
          const format = 'YYYY-MM-DD'
          let records = res.records
          let temp = [0]
          for (var i = 0; i < records.length; i++) {
            if (!_.isEmpty(records[i + 1])) {
              if (moment(records[i].date).format(format) !== moment(records[i + 1].date).format(format)) {
                temp.push(i+1)
              }
            }
          }
          temp.reverse()
          for (var i = 0; i < temp.length; i++) {
            records.splice(temp[i], 0, {
              date: moment(records[temp[i]].date).format(format),
              type: records[temp[i]].type,
              label: true
              })
          }
          // records.reverse()
          this.dataJson = records
        })
        .catch((err) => {
          Message.error({
            message: '获取游记列表失败!'
          })
        })
    },
    addTravel () {
      // invoke('api/Travels.insert', this.args)
      // .then((res) => {
      //   Message.success({
      //     message: '新增游记成功!'
      //   })
      //   this.loadData()
      // })
      // .catch((err) => {
      //   Message.error({
      //     message: '新增游记失败!'
      //   })
      // })
    },
    add () {

    },
    close () {

    },
    toggleDatePicker (index) {
      this.$refs.datepicker[index]._toggleDatepicker()
    }
  }
}
</script>

<style lang="scss">
.travels {
  .tag--gray {
    background-color: #e4e8f1;
    border-color: #e4e8f1;
    color: #fff;
    .tag__close:hover {
      background-color: #48576a;
      color: #fff;
    }
    &.is-hit {
      border-color: #48576a;
    }
  }

  .tag--primary {
    background-color: rgba(32, 160, 255, 1);
    border-color: rgba(32, 160, 255, 0.2);
    color: #fff;
    .tag__close:hover {
      background-color: #20a0ff;
      color: #fff;
    }
    &.is-hit {
      border-color: #20a0ff;
    }
  }

  .tag--success {
    background-color: rgba(18, 206, 102, 1);
    border-color: rgba(18, 206, 102, 0.2);
    color: #fff;
    .tag__close:hover {
      background-color: #13ce66;
      color: #fff;
    }
    &.is-hit {
      border-color: #13ce66;
    }
  }

  .tag--warning {
    background-color: rgba(247, 186, 41, 1);
    border-color: rgba(247, 186, 41, 0.2);
    color: #fff;
    .tag__close:hover {
      background-color: #f7ba2a;
      color: #fff;
    }
    &.is-hit {
      border-color: #f7ba2a;
    }
  }

  .tag--danger {
    background-color: rgba(255, 73, 73, 1);
    border-color: rgba(255, 73, 73, 0.2);
    color: #fff;
    .tag__close:hover {
      background-color: #ff4949;
      color: #fff;
    }
    &.is-hit {
      border-color: #ff4949;
    }
  }

  .timeline-item {
    .timeline-header {
      a {
        color: #20a0ff;
        text-decoration: none;
      }
    }
  }

  .travels-add {
    float: right;
    margin-bottom: 15px;
    margin-right: 25px;
  }

  .tag {
    &:hover {
      cursor: pointer;
    }

    .datepicker-container {
      color: #000;

      .datepicker-button {
        background: transparent;
        border: none;
        height: 0;
        width: 0;
      }

      .datepicker_week {
        color: rgba(0,0,0,0.8);
      }

      table.timepicker-table td a:hover {
        color: #333;
      }
    }
  }
}
</style>
