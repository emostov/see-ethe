# frozen_string_literal: true

class Api::AddressTypeTagsController < ApplicationController
  def index
    @tags = AddressTypeTag.all
  end

  def show
    @tag = tag.find_by(address: params[:address])
  end
end
