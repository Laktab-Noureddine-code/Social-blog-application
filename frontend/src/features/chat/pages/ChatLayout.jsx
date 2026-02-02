/* eslint-disable react/prop-types */
import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, NavLink, Link } from "react-router-dom";
import { 
  Search, Phone, Video, Info, Paperclip, Mic, Send, 
  ChevronLeft, MoreVertical, Image as ImageIcon, X,
  MapPin, Briefcase, Building2, Clock, Calendar,
  Play, Pause, MessageCircle, Users
} from "lucide-react";

// Shadcn UI Components
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/shared/ui/dropdown-menu";

// Hooks & Helpers
import useReltedUsers from "@/shared/hooks/useReltedUsers";
import useMessagesLoader from "@/shared/hooks/useMessagesLoader";
import useGroupMessages from "@/shared/hooks/useGroupMessages";
import { userProfile, groupCover } from "@/shared/helpers/helper";
import api from "@/lib/api";
import { 
  addMessage, deleteMessage, setEditingMessage, updateMessage,
  AddGroupMessages, deleteGroupMessage, updateGroupMessage,
  setSendingMessage, clearEditingMessage
} from "@/Redux/messagesSlice";
import Pusher from "pusher-js";
import { REVERB_CONFIG } from "@/config/pusher";
import MediaDialog from "../components/images/MediaDialog";

// ============================================
// HELPER FUNCTIONS
// ============================================
const formatDateHeader = (timestamp) => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return '';
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  
  return date.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: 'numeric',
    month: 'long'
  }).replace('.', '');
};

const formatTimeOnly = (timestamp) => {
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const formatLastSeen = (timestamp) => {
  if (!timestamp) return "Online";
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return "Online";
  if (diffMins < 60) return `Active ${diffMins}min ago`;
  if (diffMins < 1440) return `Active ${Math.floor(diffMins / 60)}h ago`;
  return formatTimeOnly(timestamp);
};

// ============================================
// CHAT LIST ITEM COMPONENT
// ============================================
const ChatListItem = ({ chat, isActive, isGroup, lastMessage }) => {
  const avatarUrl = isGroup ? groupCover(chat.cover) : userProfile(chat.image_profile_url);
  const name = isGroup ? chat.name : chat.name;
  const basePath = isGroup ? "/group/chat" : "/chat";
  
  return (
    <NavLink to={`${basePath}/${chat.id}`} className="block">
      <div className={`
        flex items-center gap-3 p-3 mx-2 rounded-xl cursor-pointer transition-all duration-200
        ${isActive 
          ? 'bg-blue-50 border-l-4 border-blue-500 shadow-sm' 
          : 'hover:bg-gray-50 border-l-4 border-transparent'
        }
      `}>
        <div className="relative">
          <Avatar className="h-12 w-12 ring-2 ring-white shadow-sm">
            <AvatarImage src={avatarUrl} alt={name} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {!isGroup && chat.is_online && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold text-sm truncate ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
              {name}
            </h3>
            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
              {lastMessage?.created_at ? formatTimeOnly(lastMessage.created_at) : ''}
            </span>
          </div>
          <p className="text-xs text-gray-500 truncate mt-0.5">
            {lastMessage?.message || (isGroup ? `${chat.members_count || 0} members` : "Start a conversation")}
          </p>
        </div>
        
        {lastMessage?.unread_count > 0 && (
          <span className="flex-shrink-0 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {lastMessage.unread_count}
          </span>
        )}
      </div>
    </NavLink>
  );
};

// ============================================
// LEFT SIDEBAR - CHAT LIST
// ============================================
const ChatListSidebar = ({ isGroup, selectedChatId }) => {
  useReltedUsers();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(isGroup ? "groups" : "chats");
  
  const friendsList = useSelector(state => state.relatedUsers.list);
  const groups = useSelector(state => state.groups.userGroups);
  const loading = useSelector(state => state.relatedUsers.friendsLoading);
  const allMessages = useSelector(state => state.messages.messages);
  
  const navigate = useNavigate();

  // Get last message for each chat
  const getLastMessage = (chatId, isGroupChat) => {
    if (isGroupChat) return null;
    const messages = allMessages.filter(m => 
      m.sender_id === chatId || m.receiver_id === chatId
    );
    return messages.length > 0 ? messages[messages.length - 1] : null;
  };

  const filteredList = useMemo(() => {
    const list = activeTab === "groups" ? groups : friendsList;
    if (!searchQuery.trim()) return list || [];
    return (list || []).filter(item => 
      item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeTab, groups, friendsList, searchQuery]);

  const handleTabChange = (value) => {
    setActiveTab(value);
    navigate(value === "groups" ? "/group/chat" : "/chat");
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* Header */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">Messages</h1>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-0 focus-visible:ring-1 focus-visible:ring-blue-500 rounded-xl"
          />
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full bg-gray-100 p-1 rounded-xl">
            <TabsTrigger 
              value="chats" 
              className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chats
            </TabsTrigger>
            <TabsTrigger 
              value="groups"
              className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm"
            >
              <Users className="w-4 h-4 mr-2" />
              Groups
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Separator />

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="py-2">
          {loading ? (
            // Skeleton Loaders
            [...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 mx-2">
                <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-gray-100 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))
          ) : filteredList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">
                {searchQuery ? "No results" : "No conversations"}
              </p>
            </div>
          ) : (
            filteredList.map((chat) => (
              <ChatListItem
                key={chat.id}
                chat={chat}
                isActive={chat.id === +selectedChatId}
                isGroup={activeTab === "groups"}
                lastMessage={getLastMessage(chat.id, activeTab === "groups")}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

// ============================================
// MESSAGE BUBBLE COMPONENT
// ============================================
const MessageBubble = ({ message, isMyMessage, onDelete, onEdit }) => {
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const sender = message.sender || { id: message.sender_id };

  return (
    <div className={`flex gap-2 mb-4 ${isMyMessage ? "justify-end" : "justify-start"}`}>
      {!isMyMessage && (
        <Link to={`/profile/${sender.id}`}>
          <Avatar className="h-8 w-8 mt-1">
            <AvatarImage src={userProfile(sender.image_profile_url)} />
            <AvatarFallback className="bg-gray-200 text-xs">
              {sender.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </Link>
      )}

      <div className={`max-w-[70%] ${isMyMessage ? "order-1" : "order-2"}`}>
        <div className={`
          relative group rounded-2xl px-4 py-2.5 shadow-sm
          ${isMyMessage 
            ? "bg-blue-500 text-white rounded-br-md" 
            : "bg-white text-gray-900 border border-gray-100 rounded-bl-md"
          }
          ${message.media ? "p-2" : ""}
        `}>
          {/* Media Preview */}
          {message.media && (
            <div 
              className="relative rounded-xl overflow-hidden cursor-pointer mb-2"
              onClick={() => setIsMediaOpen(true)}
            >
              <img
                src={`http://localhost:8000/storage/${message.media}`}
                alt="attachment"
                className="max-w-full h-auto rounded-xl hover:opacity-90 transition-opacity"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
            </div>
          )}

          {/* Message Text */}
          {message.message && (
            <p className="text-sm leading-relaxed break-words">{message.message}</p>
          )}

          {/* Edited Indicator */}
          {message.is_edited && (
            <span className={`text-[10px] ${isMyMessage ? 'text-blue-200' : 'text-gray-400'}`}>
              (edited)
            </span>
          )}

          {/* Actions Menu */}
          {isMyMessage && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                >
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-32">
                {message.message && (
                  <DropdownMenuItem onClick={() => onEdit(message)} className="text-blue-600">
                    Edit
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => onDelete(message.id)} className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Timestamp */}
        <p className={`text-[10px] text-gray-400 mt-1 ${isMyMessage ? 'text-right mr-1' : 'ml-1'}`}>
          {formatTimeOnly(message.created_at)}
        </p>
      </div>

      {/* Media Dialog */}
      <MediaDialog
        isOpen={isMediaOpen}
        setIsOpen={setIsMediaOpen}
        mediaUrl={`http://localhost:8000/storage/${message.media}`}
      />
    </div>
  );
};

// ============================================
// VOICE MESSAGE COMPONENT (Dummy)
// ============================================
const VoiceMessageBubble = ({ isMyMessage, duration = "0:42" }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`flex gap-2 mb-4 ${isMyMessage ? "justify-end" : "justify-start"}`}>
      <div className={`
        flex items-center gap-3 rounded-2xl px-4 py-3 shadow-sm min-w-[200px]
        ${isMyMessage 
          ? "bg-blue-500 text-white rounded-br-md" 
          : "bg-white text-gray-900 border border-gray-100 rounded-bl-md"
        }
      `}>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-8 w-8 rounded-full ${isMyMessage ? 'hover:bg-blue-400' : 'hover:bg-gray-100'}`}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        {/* Waveform Visual */}
        <div className="flex items-center gap-0.5 h-6">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className={`w-1 rounded-full ${isMyMessage ? 'bg-blue-300' : 'bg-gray-300'}`}
              style={{ height: `${Math.random() * 100}%`, minHeight: '4px' }}
            />
          ))}
        </div>
        
        <span className={`text-xs ${isMyMessage ? 'text-blue-200' : 'text-gray-400'}`}>
          {duration}
        </span>
      </div>
    </div>
  );
};

// ============================================
// MESSAGE INPUT COMPONENT
// ============================================
const MessageInput = ({ onSend, chatId, isGroup, editingMessage, onCancelEdit }) => {
  const [message, setMessage] = useState("");
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editingMessage) {
      setMessage(editingMessage.message || "");
      textareaRef.current?.focus();
    }
  }, [editingMessage]);

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(file);
      setMediaPreview(URL.createObjectURL(file));
    }
  };

  const clearMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((!message.trim() && !media) || isSending) return;

    setIsSending(true);
    dispatch(setSendingMessage(true));

    try {
      if (editingMessage) {
        // Update existing message
        const endpoint = isGroup 
          ? `/api/group/messages/${editingMessage.id}`
          : `/api/messages/${editingMessage.id}`;
        
        await api.put(endpoint, { message: message.trim() });
        
        if (isGroup) {
          dispatch(updateGroupMessage({ id: editingMessage.id, message: message.trim(), is_edited: true }));
        } else {
          dispatch(updateMessage({ id: editingMessage.id, message: message.trim(), is_edited: true }));
        }
        dispatch(clearEditingMessage());
      } else {
        // Send new message
        if (isGroup) {
          const formData = new FormData();
          formData.append('group_id', chatId);
          formData.append('message', message.trim());
          if (media) formData.append('media', media);
          
          await api.post('/api/group/messages/send', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } else {
          if (media) {
            const formData = new FormData();
            formData.append('receiver_id', String(chatId));
            if (message.trim()) formData.append('message', message.trim());
            formData.append('media', media);
            await api.post('/api/messages/send', formData);
          } else {
            await api.post('/api/messages/send', {
              receiver_id: parseInt(chatId),
              message: message.trim()
            });
          }
        }
      }

      setMessage("");
      clearMedia();
    } catch (err) {
      console.error('Message send error:', err);
    } finally {
      setIsSending(false);
      dispatch(setSendingMessage(false));
    }
  };

  return (
    <div className="border-t border-gray-100 bg-white p-4">
      {/* Editing Indicator */}
      {editingMessage && (
        <div className="flex items-center justify-between bg-blue-50 border-l-4 border-blue-500 px-3 py-2 rounded-r mb-3">
          <div>
            <span className="text-xs font-medium text-blue-600">Editing</span>
            <p className="text-sm text-gray-600 truncate max-w-xs">{editingMessage.message}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancelEdit}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Media Preview */}
      {mediaPreview && (
        <div className="relative inline-block mb-3">
          <img src={mediaPreview} alt="preview" className="h-20 w-20 object-cover rounded-xl" />
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
            onClick={clearMedia}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        {/* Attach Button */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleMediaChange}
        />
        <Button 
          type="button"
          variant="ghost" 
          size="icon" 
          className="rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        {/* Input Field */}
        <div className="flex-1 relative">
          <Input
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="pr-12 rounded-full bg-gray-50 border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>

        {/* Voice/Send Button */}
        {message.trim() || media ? (
          <Button 
            type="submit"
            size="icon" 
            className="rounded-full bg-blue-500 hover:bg-blue-600"
            disabled={isSending}
          >
            <Send className="h-5 w-5" />
          </Button>
        ) : (
          <Button 
            type="button"
            variant="ghost" 
            size="icon" 
            className="rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50"
          >
            <Mic className="h-5 w-5" />
          </Button>
        )}
      </form>
    </div>
  );
};

// ============================================
// CENTER - CONVERSATION AREA
// ============================================
const ConversationArea = ({ chatId, isGroup, chatInfo, user }) => {
  useMessagesLoader(chatId, isGroup);
  useGroupMessages(chatId, isGroup);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  const allMessages = useSelector(state => state.messages.messages);
  const allGroupMessages = useSelector(state => state.messages.groupMessages);
  const messagesLoading = useSelector(state => state.messages.messagesLoading);
  const editingMessage = useSelector(state => state.messages.editingMessage);

  // Filter and sort messages
  const sortedMessages = useMemo(() => {
    const messages = isGroup
      ? allGroupMessages.filter(m => m.group_id === +chatId)
      : allMessages.filter(m =>
          (m.sender_id === +chatId && m.receiver_id === user.id) ||
          (m.receiver_id === +chatId && m.sender_id === user.id)
        );
    return [...messages].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }, [allMessages, allGroupMessages, chatId, isGroup, user.id]);

  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups = [];
    let currentDate = '';
    let currentGroup = [];

    sortedMessages.forEach((msg) => {
      const messageDate = formatDateHeader(msg.created_at);
      if (messageDate !== currentDate) {
        if (currentGroup.length > 0) {
          groups.push({ date: currentDate, messages: [...currentGroup] });
        }
        currentGroup = [msg];
        currentDate = messageDate;
      } else {
        currentGroup.push(msg);
      }
    });

    if (currentGroup.length > 0) {
      groups.push({ date: currentDate, messages: currentGroup });
    }
    return groups;
  }, [sortedMessages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sortedMessages]);

  // Pusher real-time subscription
  useEffect(() => {
    if (!chatId) return;
    
    const pusher = new Pusher(REVERB_CONFIG.key, {
      cluster: REVERB_CONFIG.cluster || "mt1",
      wsHost: REVERB_CONFIG.wsHost,
      wsPort: REVERB_CONFIG.wsPort,
      wssPort: REVERB_CONFIG.wssPort,
      forceTLS: REVERB_CONFIG.forceTLS,
      enabledTransports: ["ws", "wss"],
    });

    const channelName = isGroup ? `group.${chatId}` : `private-chat.${user.id}`;
    const channel = pusher.subscribe(channelName);

    channel.bind(isGroup ? "group-message" : "new-message", (data) => {
      if (isGroup) {
        dispatch(AddGroupMessages(data.message));
      } else {
        dispatch(addMessage(data.message));
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, [dispatch, chatId, user.id, isGroup]);

  const handleDelete = async (messageId) => {
    try {
      const endpoint = isGroup 
        ? `/api/group/messages/${messageId}` 
        : `/api/messages/${messageId}`;
      await api.delete(endpoint);
      
      if (isGroup) {
        dispatch(deleteGroupMessage(messageId));
      } else {
        dispatch(deleteMessage(messageId));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (message) => {
    dispatch(setEditingMessage(message));
  };

  const handleCancelEdit = () => {
    dispatch(clearEditingMessage());
  };

  if (!chatInfo) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h2 className="text-lg font-medium text-gray-600">Select a conversation</h2>
          <p className="text-sm text-gray-400 mt-1">
            Choose a contact to start chatting
          </p>
        </div>
      </div>
    );
  }

  const avatarUrl = isGroup ? groupCover(chatInfo.cover) : userProfile(chatInfo.image_profile_url);
  const name = chatInfo.name;

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => navigate(isGroup ? "/group/chat" : "/chat")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} className="object-cover" />
            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div>
            <h2 className="font-semibold text-gray-900">{name}</h2>
            <p className="text-xs text-gray-500">
              {isGroup 
                ? `${chatInfo.members?.length || 0} members` 
                : formatLastSeen(chatInfo.last_seen_at)
              }
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-blue-500">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-blue-500">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-blue-500">
            <Info className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden relative">
        <div 
          className="absolute inset-0 overflow-y-auto px-4 py-4 scrollbar-thin"
          style={{ scrollBehavior: 'smooth' }}
        >
          {messagesLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`flex gap-2 ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`h-16 rounded-2xl bg-gray-200 animate-pulse ${i % 2 === 0 ? 'w-48' : 'w-56'}`} />
                </div>
              ))}
            </div>
          ) : groupedMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <MessageCircle className="w-12 h-12 mb-3" />
              <p>No messages. Start the conversation!</p>
            </div>
          ) : (
            groupedMessages.map((group, groupIndex) => (
              <div key={groupIndex}>
                {/* Date Header */}
                <div className="flex items-center justify-center my-4">
                  <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                    {group.date}
                  </span>
                </div>
                
                {/* Messages */}
                {group.messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isMyMessage={msg.sender_id === user.id}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <MessageInput 
        chatId={chatId}
        isGroup={isGroup}
        editingMessage={editingMessage}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
};

// ============================================
// RIGHT SIDEBAR - PROFILE DETAILS
// ============================================
const ProfileSidebar = ({ chatInfo, isGroup, showSidebar, onClose }) => {
  if (!chatInfo) return null;

  const avatarUrl = isGroup ? groupCover(chatInfo.cover) : userProfile(chatInfo.image_profile_url);
  const name = chatInfo.name;

  return (
    <div className={`
      w-80 bg-white border-l border-gray-100 flex flex-col
      ${showSidebar ? 'block' : 'hidden xl:block'}
    `}>
      <ScrollArea className="flex-1">
        <div className="p-6">
          {/* Close button for mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="xl:hidden absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Profile Card */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full ring-4 ring-blue-100 ring-offset-2 overflow-hidden mx-auto">
                <Avatar className="w-full h-full">
                  <AvatarImage src={avatarUrl} className="object-cover" />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              {!isGroup && chatInfo.is_online && (
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-3 border-white rounded-full" />
              )}
            </div>
            
            <h2 className="text-lg font-bold text-gray-900">{name}</h2>
            
            {!isGroup && chatInfo.phone && (
              <p className="text-sm text-gray-500 mt-1">{chatInfo.phone}</p>
            )}
            
            {chatInfo.bio && (
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{chatInfo.bio}</p>
            )}
          </div>

          <Separator className="my-4" />

          {/* Info Grid */}
          <div className="space-y-4">
            {!isGroup ? (
              <>
                {chatInfo.location && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Localisation</p>
                      <p className="text-sm font-medium text-gray-700">{chatInfo.location}</p>
                    </div>
                  </div>
                )}
                
                {chatInfo.company && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Entreprise</p>
                      <p className="text-sm font-medium text-gray-700">{chatInfo.company}</p>
                    </div>
                  </div>
                )}
                
                {chatInfo.job_title && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Poste</p>
                      <p className="text-sm font-medium text-gray-700">{chatInfo.job_title}</p>
                    </div>
                  </div>
                )}

                {chatInfo.email && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Email</p>
                      <p className="text-sm font-medium text-gray-700">{chatInfo.email}</p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Members</p>
                    <p className="text-sm font-medium text-gray-700">{chatInfo.members?.length || 0} people</p>
                  </div>
                </div>
                
                {chatInfo.created_at && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Created on</p>
                      <p className="text-sm font-medium text-gray-700">
                        {new Date(chatInfo.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <Separator className="my-4" />

          {/* Schedule Card */}
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-purple-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                Planning Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Next meeting</span>
                  <span className="font-medium text-gray-900">Today</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium text-blue-600">14:00 - 15:00</span>
                </div>
              </div>
              <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
                View Calendar
              </Button>
            </CardContent>
          </Card>

          {/* Shared Media Preview */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Shared Media</h3>
              <Button variant="link" className="text-xs text-blue-500 p-0 h-auto">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-square rounded-xl bg-gray-100 overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

// ============================================
// MAIN CHAT LAYOUT COMPONENT
// ============================================
const ChatLayout = ({ isGroup = false }) => {
  const { chatId } = useParams();
  const user = useSelector(state => state.auth.user);
  const friendsList = useSelector(state => state.relatedUsers.list);
  const groups = useSelector(state => state.groups.userGroups);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  
  // Get current chat info
  const chatInfo = isGroup
    ? groups?.find(g => g.id === +chatId)
    : friendsList?.find(f => f.id === +chatId);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-0px)] overflow-hidden bg-white">
      {/* Left Sidebar - Chat List (25%) */}
      <div className={`
        w-full lg:w-80 xl:w-[320px] flex-shrink-0
        ${chatId ? 'hidden lg:block' : 'block'}
      `}>
        <ChatListSidebar isGroup={isGroup} selectedChatId={chatId} />
      </div>

      {/* Center - Conversation Area (50%) */}
      <div className={`
        flex-1 flex flex-col min-w-0
        ${!chatId ? 'hidden lg:flex' : 'flex'}
      `}>
        <ConversationArea 
          chatId={chatId}
          isGroup={isGroup}
          chatInfo={chatInfo}
          user={user}
        />
      </div>

      {/* Right Sidebar - Profile Details (25%) */}
      {chatId && (
        <ProfileSidebar 
          chatInfo={chatInfo}
          isGroup={isGroup}
          showSidebar={showRightSidebar}
          onClose={() => setShowRightSidebar(false)}
        />
      )}
    </div>
  );
};

export default ChatLayout;
