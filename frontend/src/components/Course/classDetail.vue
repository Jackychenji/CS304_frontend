<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ClassRequestData } from "@/api/types/Course/getOneClass.ts";
import { classGetApi } from "@/api/modules/Course/getOneClass.ts";
import { CommentRequestData } from "@/api/types/Course/getComment.ts";
import { commentGetApi } from "@/api/modules/Course/getComment.ts";
import { ReplyRequestData } from "@/api/types/Course/getReply.ts";
import { replyGetApi } from "@/api/modules/Course/getReply.ts";
import { CommentClassRequestData } from "@/api/types/Course/commentClass.ts";
import { CommentPostApi } from "@/api/modules/Course/commentClass.ts";
import { useUserStore } from "@/store/modules/user.ts";
import { ReplyClassRequestData } from "@/api/types/Course/replyClass.ts";
import { replyPostApi } from "@/api/modules/Course/replyClass.ts";
import { JudgeRequestData } from "@/api/types/Course/judgeClass.ts";
import { JudgePostApi } from "@/api/modules/Course/judgeClass.ts";
import { scoreGetApi } from "@/api/modules/Course/getScore.ts";
import { useRouter } from 'vue-router';
import {deleteCommentApi} from "@/api/modules/Course/deleteComment.ts";
import {deleteReplyApi} from "@/api/modules/Course/deleteReply.ts";

const route = useRoute();
const classId = route.params.classId as string;
const comments = ref<CommentRequestData[]>([]);
const commentReplies = ref<{ [key: number]: ReplyRequestData[] }>({});
const userStore = useUserStore();
defineOptions({ name: "ElementPlus" });
const loading = ref<boolean>(false);
const selectedRow = ref<ClassRequestData | null>(null);
const showReplyInput = ref<number | null>(null);
const replyContent = ref<string>('');
const toComment = ref<boolean>(true);
const commentContent = ref<string>('');
const selectedCommentId = ref<number | null>(null);
const selectedCommentOwner = ref<string | null>(null);
const selectedReplyOwner = ref<string | null>(null);
const dialogVisible = ref<boolean>(false);
const difficultyScore = ref<number>(0);
const gradingScore = ref<number>(0);
const workloadScore = ref<number>(0);
const harvestScore = ref<number>(0);
const dataLoaded = ref<boolean>(false);
const router = useRouter();

const judgeClass = (row: ClassRequestData) => {
  dialogVisible.value = true;
  selectedRow.value = row;
  console.log(selectedRow.value);
};

const returnClass = () => {
  router.push(`/course/introduction/`);
  console.log(1);
};

const deleteComment = (commentId: string) => {
  loading.value = true;
  deleteCommentApi(commentId)
      .then(response => {
        console.log("Delete comment successful:", response);
        alert('评论已删除');
        getCommentData();
      })
      .catch(error => {
        console.error("Error deleting comment:", error);
      })
      .finally(() => {
        loading.value = false;
      });
};

const deleteReply = (replyId: string) => {
  loading.value = true;
  deleteReplyApi(replyId)
      .then(response => {
        console.log("Delete reply successful:", response);
        alert('回复已删除');
        getCommentData();
      })
      .catch(error => {
        console.error("Error deleting reply:", error);
      })
      .finally(() => {
        loading.value = false;
      });
};

const toggleReply = (commentId: number, commentOwner: string, replyId: number, replyOwner: string) => {
  if (showReplyInput.value === commentId) {
    showReplyInput.value = null;
  } else {
    if (replyId) {
      if (showReplyInput.value === replyId) {
        showReplyInput.value = null;
        return;
      }
      showReplyInput.value = replyId;
      selectedReplyOwner.value = replyOwner;
      console.log("change");
      toComment.value = false;
    } else {
      showReplyInput.value = commentId;
    }
    replyContent.value = '';
  }
  selectedCommentId.value = commentId;
  selectedCommentOwner.value = commentOwner;
};

const getScoreData = () => {
  return scoreGetApi(classId, userStore.userData.userId)
      .then(({ data }) => {
        if (data) {
          difficultyScore.value = data.difficultyScore;
          gradingScore.value = data.gradingScore;
          workloadScore.value = data.workloadScore;
          harvestScore.value = data.harvestScore;
        } else {
          selectedRow.value = {} as ClassRequestData;
        }
      })
      .catch(() => {
        selectedRow.value = {} as ClassRequestData;
      });
};

const postComment = () => {
  const comment: CommentClassRequestData = {
    authorId: userStore.userData.userId,
    content: commentContent.value,
    classId: Number(classId),
  };
  loading.value = true;
  CommentPostApi(comment)
      .then(response => {
        console.log("Post comment successful:", response);
        alert('评论成功');
        commentContent.value = '';
        showReplyInput.value = null;
        getCommentData();
      })
      .catch(error => {
        console.error("Error posting comment:", error);
      })
      .finally(() => {
        loading.value = false;
      });
};

const postReply = () => {
  const reply: ReplyClassRequestData = {
    authorId: userStore.userData.userId,
    content: replyContent.value,
    commentId: Number(selectedCommentId.value),
    receiverId: toComment.value ? 0 : selectedReplyOwner.value,
  };
  loading.value = true;
  replyPostApi(reply)
      .then(response => {
        console.log("Post reply successful:", response);
        alert('回复成功');
        replyContent.value = '';
        showReplyInput.value = null;
        getCommentData();
      })
      .catch(error => {
        console.error("Error posting reply:", error);
      })
      .finally(() => {
        loading.value = false;
      });
};

const getClassData = () => {
  return classGetApi(classId)
      .then(({ data }) => {
        selectedRow.value = data;
      })
      .catch(() => {
        selectedRow.value = {} as ClassRequestData;
      });
};

const handleJudge = () => {
  const scoresData: JudgeRequestData = {
    difficultyScore: difficultyScore.value,
    gradingScore: gradingScore.value,
    workloadScore: workloadScore.value,
    harvestScore: harvestScore.value,
    classId: selectedRow.value ? selectedRow.value.classId : 0,
    userId: userStore.userData.userId,
  };
  loading.value = true;
  JudgePostApi(scoresData)
      .then(response => {
        console.log("Post scores successful:", response);
        dialogVisible.value = false;
        alert('修改成功');
      })
      .catch(error => {
        console.error("Error posting scores:", error);
      })
      .finally(() => {
        loading.value = false;
      });
};

const getCommentData = () => {
  return commentGetApi(Number(classId))
      .then(({ data }) => {
        comments.value = data;
        commentReplies.value = {};
        return Promise.all(data.map(comment => getReplyData(comment.commentId)));
      })
      .catch(() => {
        comments.value = [];
      });
};

const getReplyData = (commentId: number) => {
  return replyGetApi(commentId)
      .then(({ data }) => {
        commentReplies.value[commentId] = data;
        console.log(commentReplies.value);
      })
      .catch(() => {
        commentReplies.value[commentId] = [];
      });
};

onMounted(() => {
  loading.value = true;
  console.log("loading")
  Promise.all([getClassData(), getCommentData(), getScoreData()])
      .then(() => {
        dataLoaded.value = true;
        console.log("true")
        console.log(selectedRow)
      })
      .catch(error => {
        console.error("Error loading data:", error);
        console.log("false")
      })
      .finally(() => {
        loading.value = false;
        console.log("nothing")
        console.log(selectedRow.value)
        console.log(Object.keys(selectedRow.value).length === 0)
        if (Object.keys(selectedRow.value).length === 0) {
          console.log(1)
          setTimeout(() => {
            window.location.reload(); // 重新加载页面
          }, 300); // 1秒的间隙
        }
      });
});
</script>


<template>
  <div class="card-header" >
    <span></span>
  </div>
  <el-container style="width: 1410px" v-if="dataLoaded">
    <el-card
        style="height: 70%; width: 100%"
        shadow="hover"
    >
      <template #header>
        <div class="card-header">
          <span>课程信息</span>
        </div>
      </template>
      <el-descriptions :column="1" border size="large">
        <el-descriptions-item align="center" label-class-name="my-label" width="80px">
          <template #label>
            <div class="cell-item">
              <el-icon class="iconfont">
                <el-icon-monitor/>
              </el-icon>
              课程名称
            </div>
          </template>
          <div v-if="selectedRow">
            {{ selectedRow.className }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item align="center" label-class-name="my-label">
          <template #label>
            <div class="cell-item">
              <el-icon class="iconfont">
                <el-icon-postcard/>
              </el-icon>
              指导老师
            </div>
          </template>
          <div v-if="selectedRow">
            {{ selectedRow.instructor }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item
            align="center"
            label-class-name="my-label"
        >
          <template #label>
            <div class="cell-item">
              <el-icon class="iconfont">
                <el-icon-user/>
              </el-icon>
              授课学期
            </div>
          </template>
          <div v-if="selectedRow">
            {{ selectedRow.semester }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item
            align="center"
            label-class-name="my-label"
        >
          <template #label>
            <div class="cell-item">
              <el-icon class="iconfont">
                <el-icon-refresh/>
              </el-icon>
              授课语言
            </div>
          </template>
          <div v-if="selectedRow">
            {{ selectedRow.language }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item
            align="center"
            label-class-name="my-label"
        >
          <template #label>
            <div class="cell-item">
              <el-icon class="iconfont">
                <el-icon-SetUp/>
              </el-icon>
              平均分
            </div>
          </template>
          <div v-if="selectedRow">
            {{ selectedRow.averageScore.toFixed(2) }}
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <div style="margin-top: 20px; text-align: center;">
          <el-button type="primary" size="large" @click="returnClass()">
            <el-icon class="iconfont">
              <el-icon-MessageBox/>
            </el-icon>
            返回课程信息
          </el-button>
        </div>
      </template>
    </el-card>
    <el-card
        style="height: 70%; width: 100%"
        shadow="hover"
    >
      <template #header>
        <div class="card-header">
          <span>课程评价</span>
        </div>
      </template>
      <el-descriptions :column="1" border size="large">
        <el-descriptions-item align="center" label-class-name="my-label " width="80px">
          <template #label>
            <div class="cell-item">
              <el-icon class="iconfont">
                <el-icon-monitor/>
              </el-icon>
              难易程度
            </div>
          </template>
          <div v-if="selectedRow">
            {{ selectedRow.difficultyScore.toFixed(2) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item align="center" label-class-name="my-label">
          <template #label>
            <div class="cell-item">
              <el-icon class="iconfont">
                <el-icon-postcard/>
              </el-icon>
              给分好坏
            </div>
          </template>
          <div v-if="selectedRow">
            {{ selectedRow.gradingScore.toFixed(2) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item
            align="center"
            label-class-name="my-label"
        >
          <template #label>
            <div class="cell-item">
              <el-icon class="iconfont">
                <el-icon-user/>
              </el-icon>
              作业量
            </div>
          </template>
          <div v-if="selectedRow">
            {{ selectedRow.workloadScore.toFixed(2) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item
            align="center"
            label-class-name="my-label"

        >
          <template #label>
            <div class="cell-item">
              <el-icon class="iconfont">
                <el-icon-refresh/>
              </el-icon>
              课程收获
            </div>
          </template>
          <div v-if="selectedRow">
            {{ selectedRow.harvestScore.toFixed(2) }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item
            align="center"
            label-class-name="my-label"
        >
          <template #label>
            <div class="cell-item">
              <el-icon class="iconfont">
                <el-icon-SetUp/>
              </el-icon>
              所属课程
            </div>
          </template>
          <div v-if="selectedRow">
            {{ selectedRow.classCourse.courseCode }}
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <div style="margin-top: 20px; text-align: center;">
          <el-button type="primary" size="large" @click="judgeClass(<ClassRequestData>selectedRow)">
            <el-icon class="iconfont">
              <el-icon-MessageBox/>
            </el-icon>
            进行课程评分
          </el-button>
        </div>
      </template>
    </el-card>
  </el-container>

  <el-card v-if="dataLoaded" class="box-card" style="margin-top: 30px; width: 100%">
    <template #header>
      <div class="card-header">
        <span>评论区</span>
      </div>
    </template>
  <template v-for="comment in comments">
    <a-comment :comment="comment">
      <template #actions>
        <span key="comment-nested-reply-to"
              @click="toggleReply(comment.commentId,comment.author.userId,null,null)">回复</span>
        <el-button v-if="comment.author.userId === userStore.userData.userId" type="danger" @click="deleteComment(comment.commentId)">删除</el-button>
      </template>
      <template #author>
        <a>{{ comment.author.userName }}</a>
        <div>{{ comment.releaseTime }}</div> <!-- 添加时间显示 -->
      </template>
      <template #avatar>
        <a-avatar :src="comment.author.avatar" :alt="comment.author.userName"/>
      </template>
      <template #content>
        <p>{{ comment.content }}</p>
      </template>
      <template v-if="showReplyInput === comment.commentId">
        <el-input type="text" v-model="replyContent" style="width: 200px" placeholder="Type your reply here"/>
        <el-button type="primary" text bg size="small" @click="postReply()">Post</el-button>
      </template>
      <!-- 回复组件 -->
      <template v-for="reply in commentReplies[comment.commentId]" :key="reply.replyId">
        <a-comment :comment="reply">
          <template #actions>
            <span key="comment-nested-reply-to"
                  @click="toggleReply(comment.commentId, comment.author.userId, reply.replyId, reply.author.userId)">
              回复
          </span>
            <el-button v-if="reply.author.userId === userStore.userData.userId" type="danger" @click="deleteReply(reply.replyId)">删除</el-button>
          </template>
          <template #author>
            <a>{{ reply.author.userName }}
              <template v-if="reply.receiver"> @ {{ reply.receiver.userName }}</template>
            </a>
            <div>{{ reply.releaseTime }}</div> <!-- 添加时间显示 -->
          </template>
          <template #avatar>
            <a-avatar :src="reply.author.avatar" :alt="reply.author.userName"/>
          </template>
          <template #content>
            <p>{{ reply.content }}</p>
          </template>
          <template v-if="showReplyInput === reply.replyId">
            <el-input type="text" v-model="replyContent" style="width: 200px" placeholder="Type your reply here"/>
            <el-button type="primary" text bg size="small" @click="postReply()">Post</el-button>
          </template>
        </a-comment>
      </template>
    </a-comment>
  </template>
  </el-card>
  <a-comment v-if="dataLoaded">
    <template #avatar>
      <a-avatar :src="userStore.userData.avatar" :alt="userStore.userData.userName"/>
    </template>
    <template #content>
      <a-form-item>
        <a-textarea v-model:value="commentContent" :rows="4"/>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" :loading="loading" type="primary" @click="postComment">
          发送
        </a-button>
      </a-form-item>
    </template>
  </a-comment>
  <el-dialog v-model="dialogVisible" title="评价课程" width="40%">
    <!-- Dialog content -->
    <div class="evaluation-dialog-content">
      <p>课程名称：{{ selectedRow ? selectedRow.className : '' }}</p>
      <p>指导老师：{{ selectedRow ? selectedRow.instructor : '' }}</p>
      <div class="evaluation-item">
        <p>难易程度：</p>
        <a-rate v-model:value="difficultyScore"/>
      </div>
      <div class="evaluation-item">
        <p>给分好坏：</p>
        <a-rate v-model:value="gradingScore"/>
      </div>
      <div class="evaluation-item">
        <p>作业量：</p>
        <a-rate v-model:value="workloadScore"/>
      </div>
      <div class="evaluation-item">
        <p>课程收获：</p>
        <a-rate v-model:value="harvestScore"/>
      </div>
    </div>
    <!-- Dialog footer -->
    <template #footer>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleJudge" :loading="loading">确认</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.custom-descriptions-item {
  width: 200px; /* 设置自定义宽度 */
}

</style>
