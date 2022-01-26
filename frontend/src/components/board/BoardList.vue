<template>
  <div>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert show><h3>글목록</h3></b-alert>
      </b-col>
    </b-row>

    <b-row>
      <b-col v-if="articles.length">
        <b-table-simple hover responsive>
          <b-thead head-variant="dark">
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>제목</b-th>
              <b-th>조회수</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <!-- 하위 component인 ListRow에 데이터 전달(props) -->
            <board-list-row
              v-for="(article, index) in articles"
              :key="index"
              v-bind="article"
            />
          </tbody>
        </b-table-simple>
      </b-col>
      <!-- <b-col v-else class="text-center">도서 목록이 없습니다.</b-col> -->
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-primary" @click="moveWrite()"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
  </b-container>
  <div class="btn-cover">
      <button :disabled="pageNum === 0" @click="prevPage" class="page-btn">
        이전
      </button>
      <span class="page-count">{{ pageNum + 1 }} / {{ pageCount }} 페이지</span>
      <button :disabled="pageNum >= pageCount - 1" @click="nextPage" class="page-btn">
        다음
      </button>
    </div>
    </div>
</template>

<script>
import BoardListRow from "@/components/board/child/BoardListRow";
import { listArticle } from "@/api/board.js";
//import axios from 'axios';


export default {
  name: "BoardList",
  components: {
    BoardListRow,
  },
  data() {
    return {
      articles: [],
      pageNum: 0,
      //pageArray: [],
    };
  },
  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 5
    }
  },
  computed: {
    pageCount () {
      console.log("pageCount");
      let listLeng = this.articles.length,
          listSize = this.pageSize,
          page = Math.floor(listLeng / listSize);
      if (listLeng % listSize > 0) page += 1;
      
      /*
      아니면 page = Math.floor((listLeng - 1) / listSize) + 1;
      이런식으로 if 문 없이 고칠 수도 있다!
      */
      return page;
    },
    paginatedData () {
      console.log("paginatedData");
      const start = this.pageNum * this.pageSize,
            end = start + this.pageSize;
            console.log(this.articles);
      return this.articles.slice(start, end);
    }
  },
  created() {
    // axios.get('http://sample.bmaster.kro.kr/contacts')
    // .then(response => {
    //   console.log(response);
    //   console.log("created response");
    //   this.pageArray = response.data.contacts;
    // })
    // .catch(err => {
    //   console.log(err);
    // });
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listArticle(
      param,
      (response) => {
        this.articles = response.data;
        //this.pageArray = response.data.contacts;
        //console.log(this.pageArray);
      },
      (error) => {
        console.log(error);
      }
    );
    // //axios 코드로 변경
    // axios.get(listArticle, {
    //   param : {
    //   pg: 1,
    //   spp: 20,
    //   key: null,
    //   word: null,
    // }
    // })
    // .then(response => {
    //   this.articles = response.data;
    //   this.pageArray = response.data.contacts;
    // })
    // .catch(error => {
    //   console.log(error);
    // });
    
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "BoardWrite" });
    },
    nextPage () {
      console.log("nextPage");
      this.pageNum += 1;
    },
    prevPage () {
      console.log("prevPage");
      this.pageNum -= 1;
    }
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
