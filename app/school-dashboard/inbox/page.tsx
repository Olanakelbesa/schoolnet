"use client";

import { useState, useEffect } from "react";
import { PenSquare } from "lucide-react";
import { InboxHeader } from "@/components/inbox/inbox-header";
import { MessageList } from "@/components/inbox/message-list";
import { MessageDetail } from "@/components/inbox/message-detail";
import { useInbox, InboxProvider } from "@/contexts/inbox-context";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Pagination } from "@/components/inbox/pagination";
import { EmptyInbox } from "@/components/inbox/empty-inbox";
import { ComposeMessageDialog } from "@/components/inbox/compose-message-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function InboxPage() {
  return (
    <InboxProvider>
      <InboxPageContent />
    </InboxProvider>
  );
}

function InboxPageContent() {
  const { messages, totalMessages, currentFilter, setFilter } = useInbox();
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const messagesPerPage = 10;
  const [composeDialogOpen, setComposeDialogOpen] = useState(false);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Get the selected message if there is one
  const selectedMessage = selectedMessageId
    ? messages.find((message) => message.id === selectedMessageId)
    : null;

  // Calculate pagination
  const totalPages = Math.ceil(totalMessages / messagesPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedMessageId(null); // Clear selected message when changing pages
  };

  // Handle message selection
  const handleSelectMessage = (messageId: string) => {
    setSelectedMessageId(messageId === selectedMessageId ? null : messageId);
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    setFilter(value);
    setSelectedMessageId(null); // Clear selected message when changing filters
    setCurrentPage(1); // Reset to first page
  };

  return (
    <>
      <div className="space-y-6">
        <InboxHeader />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Tabs
              defaultValue="all"
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="archived">Archived</TabsTrigger>
                <TabsTrigger value="deleted">Deleted</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                {isLoading ? (
                  <MessageListSkeleton />
                ) : messages.length > 0 ? (
                  <MessageListWithPagination
                    messages={messages}
                    selectedMessageId={selectedMessageId}
                    onSelectMessage={handleSelectMessage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                ) : (
                  <EmptyInbox filterType="all" />
                )}
              </TabsContent>

              <TabsContent value="unread" className="mt-4">
                {isLoading ? (
                  <MessageListSkeleton />
                ) : messages.length > 0 ? (
                  <MessageListWithPagination
                    messages={messages}
                    selectedMessageId={selectedMessageId}
                    onSelectMessage={handleSelectMessage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                ) : (
                  <EmptyInbox filterType="unread" />
                )}
              </TabsContent>

              <TabsContent value="archived" className="mt-4">
                {isLoading ? (
                  <MessageListSkeleton />
                ) : messages.length > 0 ? (
                  <MessageListWithPagination
                    messages={messages}
                    selectedMessageId={selectedMessageId}
                    onSelectMessage={handleSelectMessage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                ) : (
                  <EmptyInbox filterType="archived" />
                )}
              </TabsContent>

              <TabsContent value="deleted" className="mt-4">
                {isLoading ? (
                  <MessageListSkeleton />
                ) : messages.length > 0 ? (
                  <MessageListWithPagination
                    messages={messages}
                    selectedMessageId={selectedMessageId}
                    onSelectMessage={handleSelectMessage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                ) : (
                  <EmptyInbox filterType="deleted" />
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-2">
            {isLoading ? (
              <MessageDetailSkeleton />
            ) : selectedMessage ? (
              <MessageDetail message={selectedMessage} />
            ) : (
              <div className="flex h-[500px] items-center justify-center rounded-lg border border-dashed bg-gray-50 p-8 text-center">
                <div className="mx-auto flex max-w-md flex-col items-center">
                  <h3 className="mb-2 text-lg font-medium">
                    Select a message to view
                  </h3>
                  <p className="text-sm text-gray-500">
                    Click on a message from the list to view its contents here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating action button for composing new messages */}
      <div className="fixed bottom-6 right-6 z-10">
        <Button
          onClick={() => setComposeDialogOpen(true)}
          className="h-14 w-14 rounded-full bg-purple-600 hover:bg-purple-700 shadow-lg"
          aria-label="Compose new message"
        >
          <PenSquare className="h-6 w-6" />
        </Button>
      </div>

      {/* Compose message dialog */}
      <ComposeMessageDialog
        open={composeDialogOpen}
        onOpenChange={setComposeDialogOpen}
      />
    </>
  );
}

// Helper component for message list with pagination
interface MessageListWithPaginationProps {
  messages: any[]; // Replace 'any' with your message type if available
  selectedMessageId: string | null;
  onSelectMessage: (messageId: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function MessageListWithPagination({
  messages,
  selectedMessageId,
  onSelectMessage,
  currentPage,
  totalPages,
  onPageChange,
}: MessageListWithPaginationProps) {
  return (
    <>
      <MessageList
        messages={messages}
        selectedMessageId={selectedMessageId}
        onSelectMessage={onSelectMessage}
      />

      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </>
  );
}

// Skeleton loaders for loading states
function MessageListSkeleton() {
  return (
    <div className="space-y-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="mb-2 h-4 w-1/3" />
            <Skeleton className="mb-1 h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

function MessageDetailSkeleton() {
  return (
    <div className="rounded-lg border bg-white">
      <div className="p-4">
        <Skeleton className="mb-2 h-6 w-1/3" />
      </div>
      <div className="border-t p-4">
        <div className="flex items-start gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="mb-2 h-5 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </div>
      <div className="border-t p-4">
        <Skeleton className="mb-3 h-4 w-full" />
        <Skeleton className="mb-3 h-4 w-full" />
        <Skeleton className="mb-3 h-4 w-3/4" />
      </div>
    </div>
  );
}
