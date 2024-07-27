import { UserRoles } from "@/models/common/UserCommon";
import { User } from "@/models/server/User";
import { Customer } from "@/models/server/Customer";
import { CookieTestHandler } from "@/lib/test-utils/session";
import { userSessionOptions } from "@/lib/session";
import { Project } from "@/models/server/Project";
import { Job } from "@/models/server/Job";
import { Worker } from "@/models/server/Worker";

const TestData = {
  users: [
    {
      email: "admin@task-tracker.com",
      password: "12345678",
      role: UserRoles.Admin,
      cookieOptions: userSessionOptions,
    },
    {
      email: "worker@task-tracker.com",
      password: "12345678",
      role: UserRoles.Worker,
      cookieOptions: userSessionOptions,
    },
    {
      email: "worker2@task-tracker.com",
      password: "12345678",
      role: UserRoles.Worker,
      cookieOptions: userSessionOptions,
    },
  ],
  customers: [
    {
      name: "Test Customer 1",
      logoUrl: "https://test-customer-1.com/images/logo.png",
    },
    {
      name: "Test Customer 2",
      logoUrl: "https://test-customer-2.com/images/logo.png",
    },
    {
      name: "Test Customer 3",
      logoUrl: "https://test-customer-3.com/images/logo.png",
    },
  ],
  projects: [
    {
      name: "Test Project 1",
      website: "https://test-project-1.com",
      customerIndex: 0,
      intermediaryIndex: 2,
    },
    {
      name: "Test Project 2",
      website: "https://test-project-1.com",
      customerIndex: 0,
      intermediaryIndex: 1,
    },
  ],
  jobs: [
    {
      name: "Test Job 1",
      income: 1000,
      isActive: true,
      projectId: 0,
    },
    {
      name: "Test Job 2",
      income: 1500,
      isActive: true,
      projectId: 1,
    },
    {
      name: "Test Job 3",
      income: 3500,
      isActive: true,
      projectId: 0,
    },
    {
      name: "Test Job 4",
      income: 2000,
      isActive: true,
      projectId: 0,
    },
  ],
  workers: [
    {
      fullName: "Test Worker 1",
      enabledJobIds: [0],
      userIndex: 0,
    },
    {
      fullName: "Test Worker 2",
      enabledJobIds: [],
      userIndex: 2,
    },
    {
      fullName: "Test Worker 3",
      enabledJobIds: [0],
      userIndex: 2,
    },
    {
      fullName: "Test Worker 4",
      enabledJobIds: [0],
      userIndex: 2,
    },
    {
      fullName: "Test Worker 5",
      enabledJobIds: [0],
      userIndex: 2,
    },
  ],
};

class TestDataManager {
  private users: User[] = [];
  private cookieSessions: { [key: string]: string }[] = [];
  private customers: Customer[] = [];
  private jobs: Job[] = [];
  private projects: Project[] = [];
  private workers: Worker[] = [];
  async cleanDb() {
    await User.deleteMany();
    await Customer.deleteMany();
    await Job.deleteMany();
    await Project.deleteMany();
    await Worker.deleteMany();
  }
  async createUser(index: number = 0) {
    const user = TestData.users[index];
    this.users[index] = await User.create(user.email, user.password, user.role);
    this.cookieSessions[index] = await CookieTestHandler.createSessionCookie(
      {
        user: {
          isLoggedIn: true,
          userId: this.users[index]._id.toHexString(),
        },
      },
      user.cookieOptions,
    );
  }
  getUser(index: number) {
    return this.users[0];
  }

  getCookieSession(index: number = 0): { [key: string]: string } {
    return this.cookieSessions[index];
  }
  async createCustomer(index: number = 0) {
    const customer = TestData.customers[index];
    this.customers[index] = await Customer.create(
      customer.name,
      customer.logoUrl,
    );
  }
  getCustomer(index: number = 0) {
    return this.customers[index];
  }
  async createWorker(index: number = 0) {
    const worker = TestData.workers[index];
    const user = this.users[worker.userIndex];
    this.workers[index] = await Worker.create(worker.fullName);
    await this.workers[index].patch({
      enabledJobIds: worker.enabledJobIds.map((i) => this.jobs[i]._id),
      userId: user._id,
    });
  }
  getWorker(index: number = 0) {
    return this.workers[index];
  }
  async createJob(index: number = 0) {
    const job = TestData.jobs[index];
    const project = this.projects[job.projectId];
    this.jobs[index] = await Job.create(job.name, job.isActive, project._id);
  }
  getJob(index: number = 0) {
    return this.jobs[index];
  }
  async createProject(index: number = 0) {
    const project = TestData.projects[index];
    this.projects[index] = await Project.create(
      project.name,
      this.customers[project.customerIndex]._id,
      project.website,
      this.users[project.intermediaryIndex]?._id,
    );
  }
  getProject(index: number = 0) {
    return this.projects[index];
  }
}

export const TDM = new TestDataManager();
