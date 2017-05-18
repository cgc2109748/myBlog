<template lang="html">
  <div class="travels">
    <timeline>
      <timeline-item :label="true">
        <tag type="success">
          10 Feb. 2014
        </tag>
      </timeline-item>
      <timeline-item class="timeline-item">
        <span class="fa fa-envelope"></span>
        <div class="timeline-item">
          <span class="time"><i class="fa fa-clock-o"></i> 12:05</span>

          <h3 class="timeline-header"><a href="#">Support Team</a> sent you an email</h3>

          <div class="timeline-body">
            Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles,
            weebly ning heekya handango imeem plugg dopplr jibjab, movity
            jajah plickers sifteo edmodo ifttt zimbra. Babblely odeo kaboodle
            quora plaxo ideeli hulu weebly balihoo...
          </div>
          <div class="timeline-footer">
            <a class="button is-primary is-small">Read more</a>
            <a class="button is-danger is-small">Delete</a>
          </div>
        </div>
      </timeline-item>
      <timeline-item>
        123
      </timeline-item>
      <timeline-item :label="true">
      </timeline-item>
      <timeline-item>
        123
      </timeline-item>
    </timeline>
  </div>
</template>

<script>
import Tag from 'components/tag'
import {Timeline, TimelineItem} from 'components/Timeline'
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  components: {
    Tag,
    Timeline,
    TimelineItem
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
}
</style>
