flowchart TD
  Start[Start] --> InitConfig[Initialize Config]
  InitConfig --> RouteDecision{Decide Route}
  RouteDecision -->|Static| StaticGen[Static Page Generation]
  RouteDecision -->|Dynamic| DynamicGen[Dynamic Page Generation]
  StaticGen --> FetchContent[Fetch MDX Content]
  DynamicGen --> FetchContent
  FetchContent --> ComposeLayout[Compose Layout]
  ComposeLayout --> RenderUI[Render UI Components]
  RenderUI --> UserInteract[User Interaction]
  UserInteract -->|Action| HandleEvent[Handle UI Event]
  HandleEvent --> UpdateState[Update State]
  UpdateState --> APICall[API Requests]
  APICall --> DataUpdate[Update Data]
  DataUpdate --> ComposeLayout
  RenderUI --> Analytics[Send Analytics Event]
  UserInteract --> Analytics
  BlogWebhook[Blog Webhook Received] --> WebhookHandler[Handle Webhook]
  WebhookHandler --> ContentUpdate[Update MDX Content]
  ContentUpdate --> StaticGen