import React, { useState } from 'react';
import { Share2, Copy, Check, Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';

const ShareButton = ({ post, variant = 'default', size = 'sm' }) => {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const shareUrl = `https://taxed.ch/blog/${post.slug}`;
  const shareTitle = post.title;
  const shareDescription = post.summary;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareToEmail = () => {
    const subject = encodeURIComponent(shareTitle);
    const body = encodeURIComponent(`${shareDescription}\n\nRead more: ${shareUrl}`);
    const url = `mailto:?subject=${subject}&body=${body}`;
    window.open(url);
    setShowShareMenu(false);
  };

  const shareToNative = () => {
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareDescription,
        url: shareUrl,
      }).catch(console.error);
    } else {
      handleCopyLink();
    }
    setShowShareMenu(false);
  };

  if (variant === 'simple') {
    return (
      <Button 
        variant="outline" 
        size={size}
        onClick={shareToNative}
        className="flex items-center"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size={size}
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>

      {showShareMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowShareMenu(false)}
          />
          
          {/* Share Menu */}
          <Card className="absolute top-full right-0 mt-2 z-50 w-64 shadow-xl border-steel-blue/20">
            <CardContent className="p-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-dark-gray text-sm mb-3">Share this article</h4>
                
                {/* Native Share */}
                {navigator.share && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareToNative}
                    className="w-full justify-start"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share via...
                  </Button>
                )}

                {/* Copy Link */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  className="w-full justify-start"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>

                {/* Social Media Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareToFacebook}
                    className="justify-start"
                  >
                    <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                    Facebook
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareToTwitter}
                    className="justify-start"
                  >
                    <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                    Twitter
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareToLinkedIn}
                    className="justify-start"
                  >
                    <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                    LinkedIn
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareToEmail}
                    className="justify-start"
                  >
                    <Mail className="w-4 h-4 mr-2 text-gray-600" />
                    Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default ShareButton;
