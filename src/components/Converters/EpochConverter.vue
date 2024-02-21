<template>
  <div class="page">
    <select id="env-picker" v-model="selectedEnvIndex">
      <option v-for="env in envs" :value="env.index">
        {{ env.name }}
      </option>
    </select>
    <div id="time-picker">
      <input
        type="date"
        name="date"
        v-model="date"
        @change="changeDateEvent()"
      />
      <input
        type="time"
        name="time"
        step="1"
        v-model="time"
        @change="changeTimeEvent()"
      />
    </div>
    <div class="time">{{ timestamp }}</div>
    <div>
      <input
        type="checkbox"
        name="liveData"
        v-model="liveData"
        title="live data"
      />
      <label for="liveData">live</label>
    </div>

    <div class="epoch-section">
      <div
        v-if="
          envs[selectedEnvIndex].computedStats?.round !== undefined &&
          envs[selectedEnvIndex].computedStats?.epoch !== undefined &&
          envs[selectedEnvIndex].stats
        "
        id="results"
      >
        <div>
          <label>epoch</label>
          <input
            type="number"
            min="0"
            v-model="envs[selectedEnvIndex].computedStats.epoch"
            placeholder="epoch"
            @change="changeEpochEvent()"
          />
        </div>
        <div>
          <label>round</label>
          <input
            type="number"
            min="0"
            :max="envs[selectedEnvIndex].stats.roundsPerEpoch"
            v-model="envs[selectedEnvIndex].computedStats.round"
            placeholder="round"
            @change="changeRoundEvent()"
          />
        </div>

        <div id="ps">
          <p>
            1 epoch = {{ envs[selectedEnvIndex].stats.roundsPerEpoch }} rounds
          </p>
          <p>
            1 x round =
            {{ envs[selectedEnvIndex].stats.refreshRate / 1000 }} seconds
          </p>
          <p>PS: precision error less or equal to 1 round</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {
  testnetApiUrl,
  devnetApiUrl,
  mainnetApiUrl,
} from "../../utils/constants";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopy, faRepeat, faPlay } from "@fortawesome/free-solid-svg-icons";
library.add(faCopy, faRepeat, faPlay);

const localStorageKeys = {
  refreshStatsTimestamp: "refreshStatsTimestamp",
  testnetStats: "testnetStats",
  devnetStats: "devnetStats",
  mainnetStats: "mainnetStats",
};

export default {
  components: {},
  data() {
    return {
      liveData: false,
      date: undefined,
      time: undefined,
      timestamp: undefined,
      refreshStatsTimestamp: undefined,
      selectedEnvIndex: 0,
      envs: [
        {
          name: "mainnet",
          // last stats from api.multiversx.com/stats
          stats: undefined,
          // current epoch & round (based on stats + current date & time)
          currentStats: undefined,
          // computed epoch & round (based on currentStats + custom date & time)
          computedStats: undefined,
          index: 0,
        },
        {
          name: "testnet",
          stats: undefined,
          currentStats: undefined,
          computedStats: undefined,
          index: 1,
        },
        {
          name: "devnet",
          stats: undefined,
          currentStats: undefined,
          computedStats: undefined,
          index: 2,
        },
      ],
    };
  },
  created() {
    this.timer = setInterval(this.computeAndUpdateEpochs, 1000);
  },
  async mounted() {
    await this.loadApiStatsFromLocalStorage();
    this.computeAndUpdateEpochs(false, true);
  },
  watch: {
    selectedEnvIndex() {
      this.computeAndUpdateEpochs(false, true);
    },
  },
  methods: {
    async loadApiStatsFromLocalStorage() {
      this.refreshStatsTimestamp = localStorage.getItem(
        localStorageKeys.refreshStatsTimestamp
      );

      if (!this.refreshStatsTimestamp) {
        await this.saveApiStats();
        return;
      }

      this.envs[0].stats = JSON.parse(
        localStorage.getItem(localStorageKeys.mainnetStats)
      );
      this.envs[1].stats = JSON.parse(
        localStorage.getItem(localStorageKeys.devnetStats)
      );
      this.envs[2].stats = JSON.parse(
        localStorage.getItem(localStorageKeys.testnetStats)
      );

      await this.computeAndUpdateEpochs();
    },
    async saveApiStats() {
      const query =
        "/stats?fields=refreshRate,epoch,roundsPassed,roundsPerEpoch";
      const testnetStatsUrl = `${testnetApiUrl}${query}`;
      const devnetStatstUrl = `${devnetApiUrl}${query}`;
      const mainnetStatstUrl = `${mainnetApiUrl}${query}`;

      const [testnetStats, devnetStats, mainnetStats] = await Promise.all([
        this.get(testnetStatsUrl),
        this.get(devnetStatstUrl),
        this.get(mainnetStatstUrl),
      ]);

      localStorage.setItem(localStorageKeys.refreshStatsTimestamp, new Date());
      localStorage.setItem(
        localStorageKeys.testnetStats,
        JSON.stringify(testnetStats)
      );
      localStorage.setItem(
        localStorageKeys.devnetStats,
        JSON.stringify(devnetStats)
      );
      localStorage.setItem(
        localStorageKeys.mainnetStats,
        JSON.stringify(mainnetStats)
      );

      this.loadApiStatsFromLocalStorage();
    },
    async get(url) {
      const res = await axios.get(url);
      return res.data;
    },
    async computeAndUpdateEpochs(manual = false, init = false) {
      if (!this.liveData && !manual && !init) {
        return;
      }

      if (!manual || init) {
        this.updateDateTimeAndTimestamp();
      }

      const [epoch, round] = this.getEpochAndRoundByTimestamp(this.timestamp);
      this.envs[this.selectedEnvIndex].currentStats = {
        epoch,
        round,
      };

      if (this.liveData || manual || init) {
        this.envs[this.selectedEnvIndex].computedStats =
          this.envs[this.selectedEnvIndex].currentStats;
      }
    },
    updateDateTimeAndTimestamp(customDate = null, customTime = null) {
      if (customDate && customTime) {
        let customDateTime = new Date(customDate);
        let time = customTime.split(":");
        customDateTime.setHours(time[0], time[1], time[2]);
        this.timestamp = (customDateTime.getTime() / 1000).toFixed(0);
        return;
      }

      this.timestamp = (Date.now() / 1000).toFixed(0);
      this.updateDateAndTimeByTimestamp(this.timestamp);
    },
    updateDateAndTimeByTimestamp(timestamp) {
      const datetime = new Date(timestamp * 1000);
      this.date = datetime.toISOString().split("T")[0];
      this.time =
        ("0" + datetime.getHours()).slice(-2) +
        ":" +
        ("0" + datetime.getMinutes()).slice(-2) +
        ":" +
        ("0" + datetime.getSeconds()).slice(-2);
    },
    /// computes and returns epoch, round and now (current timestamp / 1000)
    /// based on env & last saved data from API
    getEpochAndRoundByTimestamp(timestamp) {
      const env = this.getCurrentEnv();
      return this.timestampToEpochAndRound(
        timestamp,
        this.refreshStatsTimestamp,
        env.stats.epoch,
        env.stats.roundsPassed,
        env.stats.roundsPerEpoch,
        env.stats.refreshRate
      );
    },
    getCurrentEnv() {
      return this.envs[this.selectedEnvIndex];
    },
    timestampToEpochAndRound(
      timestamp,
      statsTimestamp,
      currentEpoch,
      currentRound,
      roundsPerEpoch,
      milisecondsPerRound
    ) {
      const timeDiffInMs =
        +new Date(statsTimestamp).getTime() -
        +new Date(timestamp * 1000).getTime();

      const roundDiff = timeDiffInMs / milisecondsPerRound;

      const [epoch, round] = this.addOrSubstractRounds(
        -roundDiff,
        currentEpoch,
        currentRound,
        roundsPerEpoch
      );

      return [epoch, round, timestamp];
    },
    addOrSubstractRounds(
      roundsDiff,
      currentEpoch,
      currentRound,
      roundsPerEpoch
    ) {
      let epoch = currentEpoch;
      let round = currentRound;

      if (roundsDiff > 0) {
        round = (currentRound + roundsDiff) % roundsPerEpoch;
        epoch += (currentRound + roundsDiff) / roundsPerEpoch;
      } else {
        if (currentRound > -roundsDiff) {
          round = (currentRound + roundsDiff) % roundsPerEpoch;
        } else {
          round =
            roundsPerEpoch + ((roundsDiff + currentRound) % roundsPerEpoch);
        }
        epoch += (currentRound + roundsDiff) / roundsPerEpoch;
      }

      return [Math.trunc(epoch), Math.trunc(round)];
    },
    computeAndUpdateTimestampFromRoundAndEpoch() {
      const env = this.getCurrentEnv();
      const roundsPerEpoch = env.stats.roundsPerEpoch;
      const milisecondsPerRound = env.stats.refreshRate;

      // where we are now (we can also use the stats + refreshStatsTimestamp)
      const [currentEpoch, currentRound, now] =
        this.getEpochAndRoundByTimestamp(Date.now() / 1000);

      // to convert to
      const epoch = env.computedStats.epoch;
      const round = env.computedStats.round;

      const epochDiff = epoch - currentEpoch;
      let roundsDiff =
        roundsPerEpoch -
        currentRound +
        (epochDiff - 1) * roundsPerEpoch +
        round;

      const timeDiffInMs = roundsDiff * milisecondsPerRound;

      this.timestamp = (now + timeDiffInMs / 1000).toFixed(0);
      this.updateDateAndTimeByTimestamp(this.timestamp);
    },
    // change epoch/round 'event'
    changeRoundEvent() {
      if (
        this.envs[this.selectedEnvIndex].computedStats.round >
        this.envs[this.selectedEnvIndex].stats.roundsPerEpoch
      ) {
        this.envs[this.selectedEnvIndex].computedStats.round =
          this.envs[this.selectedEnvIndex].stats.roundsPerEpoch;
      } else if (this.envs[this.selectedEnvIndex].computedStats.round <= 0) {
        this.envs[this.selectedEnvIndex].computedStats.round = 0;
      }
      this.liveData = false;
      this.computeAndUpdateTimestampFromRoundAndEpoch();
    },
    changeEpochEvent() {
      if (this.envs[this.selectedEnvIndex].computedStats.epoch <= 0) {
        this.envs[this.selectedEnvIndex].computedStats.epoch = 0;
      }
      this.liveData = false;
      this.computeAndUpdateTimestampFromRoundAndEpoch();
    },
    /// change date/time 'event'
    changeDateEvent() {
      this.liveData = false;
      this.updateDateTimeAndTimestamp(this.date, this.time);
      this.computeAndUpdateEpochs(true);
    },
    changeTimeEvent() {
      this.liveData = false;
      this.updateDateTimeAndTimestamp(this.date, this.time);
      this.computeAndUpdateEpochs(true);
    },
  },
};
</script>

<style lang="scss">
.epoch-section {
  margin-top: 50px;
}

.epoch-section-stats {
  margin-top: 10px;
}

#env-picker {
  margin-bottom: 5px;
  & input {
    height: 40px;
  }
}

#time-picker {
  display: flex;
  justify-content: center;
  gap: 5px;
  & input {
    height: 40px;
  }
}

#results {
  flex-direction: column;
  display: flex;

  & div {
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5px;
  }

  & label {
    width: 75px;
  }

  & input {
    height: 40px;
    width: 100px;
    text-align: center;
    margin-left: 10px;
  }
}

#ps {
  padding-top: 50px;
  flex-direction: column;
  justify-content: center;

  & p {
    font-size: 16px;
  }
}
</style>
