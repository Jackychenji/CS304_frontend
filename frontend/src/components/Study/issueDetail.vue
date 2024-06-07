<script setup lang="ts">
import {ref} from 'vue';
import {useRoute} from 'vue-router';
import {useUserStore} from "@/store/modules/user.ts";
import {IssueRequestData} from "@/api/types/StudyAdvice/getOneIssue.ts";
import {issueGetApi} from "@/api/modules/StudyAdvice/getOneIssue.ts";
import {SolutionRequestData} from "@/api/types/StudyAdvice/getSolution.ts";
import {solutionGetApi} from "@/api/modules/StudyAdvice/getSolution.ts";
import {DiscussionRequestData} from "@/api/types/StudyAdvice/getDiscussion.ts";
import {discussionGetApi} from "@/api/modules/StudyAdvice/getDiscussion.ts";
import {SolutionPostRequestData} from "@/api/types/StudyAdvice/postSolution.ts";
import {SolutionPostApi} from "@/api/modules/StudyAdvice/postSolution.ts";
import {SolutionVoteRequestData} from "@/api/types/StudyAdvice/voteSolution.ts";
import {SolutionVoteApi} from "@/api/modules/StudyAdvice/voteSolution.ts";
import {discussionPostApi} from "@/api/modules/StudyAdvice/postDiscussion.ts";
import {DiscussionPostRequestData} from "@/api/types/StudyAdvice/postDiscussion.ts";
import {IssueVoteRequestData} from "@/api/types/StudyAdvice/voteIssue.ts";
import {IssueVoteApi} from "@/api/modules/StudyAdvice/voteIssue.ts";
import {deleteSolutionApi} from "@/api/modules/StudyAdvice/deleteSolution.ts";
import {deleteDiscussionApi} from "@/api/modules/StudyAdvice/deleteDiscussion.ts";


const route = useRoute();
const defaultAvatar = 'https://example.com/default-avatar.jpg';
const issueId = route.params.issueId as string;
const solution = ref<SolutionRequestData[]>([])
const solutionContent = ref<string>('');
const discussion = ref<{
  [key: number]: DiscussionRequestData[]
}>({}) // Store replies for each comment
const userStore = useUserStore();
const showReplyInput = ref<number | null>(null); // Store the commentId for which reply input is shown
const selectedReplyOwner = ref<string | null>(null); // Store the owner of the selected comment
const toComment = ref<boolean>(true); // 控制对话框的显示与隐藏
const replyContent = ref<string>(''); // Store the content of the reply
const selectedCommentId = ref<number | null>(null); // Store the selected comment ID
const selectedCommentOwner = ref<string | null>(null); // Store the owner of the selected comment
defineOptions({
  // 命名当前组件
  name: "ElementPlus"
})
const loading = ref<boolean>(false)
const selectedRow = ref<IssueRequestData | null>(null); // 保存选中行的数据

const toggleReply = (commentId: number, commentOwner: string, replyId: number, replyOwner: string) => {
  if (showReplyInput.value === commentId) {
    showReplyInput.value = null; // Hide reply input if already shown
  } else {
    if (replyId) {
      if (showReplyInput.value === replyId) {
        showReplyInput.value = null;
        return;
      }
      showReplyInput.value = replyId; // Show reply input for the clicked reply
      selectedReplyOwner.value = replyOwner; // 更新回复的所有者信息
      console.log("change")
      toComment.value = false;
    } else {
      showReplyInput.value = commentId; // Show reply input for the clicked comment
    }
    replyContent.value = ''; // Clear previous reply content
  }
  // Update the selected comment ID and owner
  selectedCommentId.value = commentId;
  selectedCommentOwner.value = commentOwner;
}

const postReply = () => {
  if (toComment.value) {
    console.log(1)
    const reply: DiscussionPostRequestData = {
      authorId: userStore.userData.userId,
      content: replyContent.value,
      solutionId: selectedCommentId.value,
      receiverId: selectedCommentOwner.value
    }
    console.log(reply)
    discussionPostApi(reply)
        .then(response => {
          // 在这里处理成功响应
          console.log("Post reply successful:", response);
          alert('回复成功')
          replyContent.value = ''
          showReplyInput.value = null;
          getSolutionData();
        })
        .catch(error => {
          // 在这里处理错误响应
          console.error("Error posting reply:", error);
          // 如果需要，可以在这里更新 UI 或者执行其他操作

        })
        .finally(() => {
          loading.value = false;
        });
  } else {
    console.log(2)
    const reply: DiscussionPostRequestData = {
      authorId: userStore.userData.userId,
      content: replyContent.value,
      solutionId: selectedCommentId.value,
      receiverId: selectedReplyOwner.value
    }
    console.log(reply)
    discussionPostApi(reply)
        .then(response => {
          // 在这里处理成功响应
          console.log("Post reply successful:", response);
          alert('回复成功')
          replyContent.value = ''
          showReplyInput.value = null;
          getSolutionData();
        })
        .catch(error => {
          // 在这里处理错误响应
          console.error("Error posting reply:", error);
          // 如果需要，可以在这里更新 UI 或者执行其他操作

        })
        .finally(() => {
          loading.value = false;
        });
  }
};

const handleVoteIssue = (issue: number) => {
  console.log(issue)
  const voteIssue: IssueVoteRequestData = {
    userId: userStore.userData.userId,
    issueId: issue,
    vote: 1
  };
  loading.value = true;
  console.log(voteIssue)
  IssueVoteApi(voteIssue)
      .then(response => {
        // 在这里处理成功响应
        console.log("Post solution successful:", response);
        getIssueData();

      })
      .catch(error => {
        // 在这里处理错误响应
        console.error("Error posting solution:", error);
        // 如果需要，可以在这里更新 UI 或者执行其他操作

      })
      .finally(() => {
        loading.value = false;
      });
};


const handleButtonClick = (solutions: number) => {
  const voteSolution: SolutionVoteRequestData = {
    userId: userStore.userData.userId,
    solutionId: solutions,
    vote: 1
  };
  loading.value = true;
  console.log(voteSolution)
  SolutionVoteApi(voteSolution)
      .then(response => {
        // 在这里处理成功响应
        console.log("Post solution successful:", response);
        getSolutionData();

      })
      .catch(error => {
        // 在这里处理错误响应
        console.error("Error posting solution:", error);
        // 如果需要，可以在这里更新 UI 或者执行其他操作

      })
      .finally(() => {
        loading.value = false;
      });
};

const generateAuthor = (disc: DiscussionRequestData): string => {
  if (disc.receiver && disc.receiver.userName && disc.author.userName!=disc.receiver.userName) {
    return `${disc.author.userName} @ ${disc.receiver.userName}`;
  } else {
    return disc.author.userName;
  }
}

const getIssueData = () => {
  loading.value = true
  issueGetApi(issueId)
      .then(({data}) => {
        selectedRow.value = data
      })
      .catch(() => {
        selectedRow.value = {}
      })
      .finally(() => {
        loading.value = false
      })
}
const getSolutionData = () => {
  loading.value = true;
  solutionGetApi(issueId)
      .then(({data}) => {
        solution.value = data;
        // Clear previous replies
        discussion.value = {};
        // Fetch replies for each comment
        data.forEach(solution => {
          getDiscussionData(solution.solutionId);
        });
      })
      .catch(() => {
        solution.value = [];
      })
      .finally(() => {
        loading.value = false;
      });
}
const getDiscussionData = (solutionId: number) => {
  loading.value = true;
  discussionGetApi(solutionId)
      .then(({data}) => {
        discussion.value[solutionId] = data;
      })
      .catch(() => {
        discussion.value[solutionId] = [];
      })
      .finally(() => {
        loading.value = false;
      });
}
const postSolution = () => {
  const newSolution: SolutionPostRequestData = {
    authorId: userStore.userData.userId,
    content: solutionContent.value,
    issueId: issueId
  };
  loading.value = true;
  console.log(newSolution)
  SolutionPostApi(newSolution)
      .then(response => {
        // 在这里处理成功响应
        console.log("Post solution successful:", response);
        alert('评论成功')
        solutionContent.value = ''
        getSolutionData();
      })
      .catch(error => {
        // 在这里处理错误响应
        console.error("Error posting solution:", error);
        // 如果需要，可以在这里更新 UI 或者执行其他操作

      })
      .finally(() => {
        loading.value = false;
      });
};

const deleteSolution = (solutionId: number) => {
  loading.value = true;
  deleteSolutionApi(solutionId)
      .then(response => {
        console.log("Delete successful:", response);
        alert('已删除');
        getSolutionData();
      })
      .catch(error => {
        console.error("Error deleting:", error);
      })
      .finally(() => {
        loading.value = false;
      });
};

const deleteDiscussion = (DiscussionId: number) => {
  loading.value = true;
  deleteDiscussionApi(DiscussionId)
      .then(response => {
        console.log("Delete successful:", response);
        alert('已删除');
        getSolutionData();
      })
      .catch(error => {
        console.error("Error deleting:", error);
      })
      .finally(() => {
        loading.value = false;
      });
};

getSolutionData();
getIssueData();


</script>

<template>
  <el-container style="width: 1410px">
    <el-card
        style="height: 70%; width: 100%"
        shadow="hover"
    >

      <a-typography>
        <a-typography-title>{{ selectedRow?.title }} <span class="issue-number">#{{ selectedRow?.issueId }}</span>
        </a-typography-title>
        <a-typography-paragraph>
          <a-tag color="green" v-if="selectedRow?.open">开启</a-tag>
          <a-tag color="red" v-else>关闭</a-tag>
          <span>{{ selectedRow?.opener.userName }} 提问于 {{
              selectedRow?.releaseTime
            }} {{ solution.length }} 回答</span>
        </a-typography-paragraph>

        <a-divider/>

        <!-- Issue Creator Comment -->
        <a-comment
            :author="selectedRow?.opener.userName"
            :avatar="selectedRow?.opener.avatar || defaultAvatar"
            :content="selectedRow?.content"
            :datetime="selectedRow?.releaseTime"
        >
          <el-button type="primary" size="small" @click="handleVoteIssue(selectedRow.issueId)">
            <el-icon class="iconfont">
              <el-icon-MessageBox/>
            </el-icon>
            {{ selectedRow?.vote }}点赞
          </el-button>
        </a-comment>

        <a-divider/>

        <!-- Solutions and Discussions -->
        <a-typography-title level="3">回答</a-typography-title>
        <div v-for="sol in solution" :key="sol.solutionId">
          <a-comment
              :author="sol.author.userName"
              :avatar="sol.author.avatar || defaultAvatar"
              :content="sol.content"
              :datetime="sol.releaseTime"
          >
            <template #actions>
              <span key="comment-nested-reply-to" v-if="selectedRow?.open"
                    @click="toggleReply(sol.solutionId,sol.author.userId,null,null)">回复</span>
              <el-button type="primary" size="small" @click="handleButtonClick(sol.solutionId)">
                <el-icon class="iconfont">
                  <el-icon-edit/>
                </el-icon>
                {{ sol.approval }} 点赞
              </el-button>
              <el-button v-if="sol.author.userId===userStore.userData.userId||selectedRow?.opener.userName===userStore.userData.userId"
                  size="small" type="danger" @click="deleteSolution(sol.solutionId)">删除</el-button>
            </template>
            <template v-if="showReplyInput === sol.solutionId">
              <el-input type="text" v-model="replyContent" style="width: 200px" placeholder="Type your discussion here"/>
              <el-button type="primary" text bg size="small" @click="postReply()">Post</el-button>
            </template>


            <!-- Discussions as Replies -->
            <template v-for="disc in discussion[sol.solutionId]" :key="disc.discussionId">
              <a-comment
                  :author="generateAuthor(disc)"
                  :avatar="disc.author.avatar || defaultAvatar"
                  :content="disc.content"
                  :datetime="disc.releaseTime">
                <template #actions>
              <span key="comment-nested-reply-to" v-if="selectedRow?.open"
                    @click="toggleReply(sol.solutionId,sol.author.userId, disc.discussionId, disc.author.userId)">
                  回复
              </span>
                  <el-button v-if="disc.author.userId===userStore.userData.userId||selectedRow?.opener.userName===userStore.userData.userId"
                             size="small" type="danger" @click="deleteDiscussion(disc.discussionId)">删除
                  </el-button>
                </template>
                <template v-if="showReplyInput === disc.discussionId">
                  <el-input type="text" v-model="replyContent" style="width: 200px" placeholder="Type your discussion here"/>
                  <el-button type="primary" text bg size="small" @click="postReply()">Post</el-button>
                </template>
              </a-comment>

            </template>


          </a-comment>
          <a-divider/>

        </div>
      </a-typography>
      <a-comment v-if="selectedRow?.open">
        <template #avatar>
          <a-avatar :src="userStore.userData.avatar || defaultAvatar" alt="您"/>
        </template>
        <template #content>
          <a-form-item>
            <a-textarea v-model:value="solutionContent" :rows="4"/>
          </a-form-item>
          <a-form-item>
            <a-button html-type="submit" :loading="loading" type="primary" @click="postSolution">
              发送
            </a-button>
          </a-form-item>
        </template>
      </a-comment>
    </el-card>
  </el-container>
</template>
<style lang="scss" scoped>
.custom-descriptions-item {
  width: 200px; /* 设置自定义宽度 */
}

.issue-number {
  color: #666;
  font-size: 40px;
}

a-avatar {
  margin-right: 18px;
}

a-tag {
  margin-right: 8px;
}

a-divider {
  margin: 24px 0;
}

</style>
