# frozen_string_literal: true

class Api::AddressTypeTagsController < ApplicationController
  def index
    @tags = AddressTypeTag.all
  end

  def show
    @tag = AddressTypeTag.find_by(address: params[:id])
  end
end
